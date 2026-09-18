from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from sqlalchemy.exc import IntegrityError
from sqlmodel import Session, select

from app.core.security import (
    create_access_token,
    create_refresh_token,
    hash_password,
    verify_password,
    verify_token,
)
from app.database import get_session
from app.models import User
from app.schemas.auth import (
    SigninRequest,
    SignupRequest,
    TokenResponse,
    UserResponse,
)

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"],
)

security = HTTPBearer()


def get_current_user(
    credentials: Annotated[
        HTTPAuthorizationCredentials,
        Depends(security),
    ],
    session: Annotated[Session, Depends(get_session)],
) -> User:

    try:
        user_id = verify_token(
            credentials.credentials,
            token_type="access",
        )
    except ValueError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired access token.",
            headers={"WWW-Authenticate": "Bearer"},
        )

    user = session.get(User, user_id)

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found.",
        )

    return user


@router.post(
    "/signup",
    response_model=UserResponse,
    status_code=status.HTTP_201_CREATED,
)
def signup_user(
    user_data: SignupRequest,
    session: Annotated[Session, Depends(get_session)],
):
    existing_user = session.exec(
        select(User).where(User.email == user_data.email)
    ).first()

    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Email already registered.",
        )

    password_hash = hash_password(user_data.password)

    user = User(
        name=user_data.name,
        email=user_data.email,
        password_hash=password_hash,
    )

    session.add(user)

    try:
        session.commit()
        session.refresh(user)

    except IntegrityError as exc:
        session.rollback()

        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Email already registered.",
        ) from exc

    return user


@router.post(
    "/signin",
    response_model=TokenResponse,
)
def signin_user(
    credentials: SigninRequest,
    session: Annotated[Session, Depends(get_session)],
):
    user = session.exec(
        select(User).where(User.email == credentials.email)
    ).first()

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password.",
        )

    if not verify_password(
        credentials.password,
        user.password_hash,
    ):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password.",
        )

    access_token = create_access_token(user.id)
    refresh_token = create_refresh_token(user.id)

    return TokenResponse(
        access_token=access_token,
        refresh_token=refresh_token,
        token_type="bearer",
    )


@router.get(
    "/me",
    response_model=UserResponse,
)
def get_current_user_info(
    current_user: Annotated[User, Depends(get_current_user)],
):
    return current_user


@router.post(
    "/refresh",
    response_model=TokenResponse,
)
def refresh_access_token(
    refresh_token: str,
):
    try:
        user_id = verify_token(
            refresh_token,
            token_type="refresh",
        )

    except ValueError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired refresh token.",
        )

    new_access_token = create_access_token(user_id)

    return TokenResponse(
        access_token=new_access_token,
        refresh_token=refresh_token,
        token_type="bearer",
    )


@router.post("/logout")
def logout_user(
    current_user: Annotated[User, Depends(get_current_user)],
):
    return {"message": "Successfully logged out."}
