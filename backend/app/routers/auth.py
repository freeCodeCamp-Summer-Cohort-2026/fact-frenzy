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
from app.models import RefreshRequest, User
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

SessionDep = Annotated[Session, Depends(get_session)]


def get_current_user(
    credentials: Annotated[
        HTTPAuthorizationCredentials,
        Depends(security),
    ],
    session: SessionDep,
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
    session: SessionDep,
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

    except IntegrityError as exc:
        # reset the session after the failed transaction
        session.rollback()

        if (
            "unique" in str(exc.orig).lower()
            or "ix_user_email" in str(exc.orig).lower()
        ):
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="Email already registered.",
            ) from exc

        raise

    # Refresh after successful commit
    session.refresh(user)
    return user


@router.post(
    "/signin",
    response_model=TokenResponse,
)
def signin_user(
    credentials: SigninRequest,
    session: SessionDep,
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
    body: RefreshRequest,
    session: SessionDep,
):
    try:
        user_id = verify_token(
            body.refresh_token,
            token_type="refresh",
        )

    except ValueError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired refresh token.",
        )

    user = session.get(User, user_id)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found or account inactive.",
        )
    new_access_token = create_access_token(user_id)

    return TokenResponse(
        access_token=new_access_token,
        refresh_token=body.refresh_token,
        token_type="bearer",
    )


@router.post("/logout")
def logout_user(
    current_user: Annotated[User, Depends(get_current_user)],
):
    """
    Stateless logout endpoint.

    Since authentication uses stateless Bearer JWT tokens, actual logout
    is handled on the client side by removing the tokens from client storage.
    """
    return {"message": "Successfully logged out."}
