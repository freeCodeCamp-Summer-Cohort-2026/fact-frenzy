from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.exc import IntegrityError
from sqlmodel import Session, select

from app.core.security import hash_password
from app.database import get_session
from app.models import User, UserCreate, UserRead

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post(
    "/signup", response_model=UserRead, status_code=status.HTTP_201_CREATED
)
def signup_user(
    user_create: UserCreate, session: Annotated[Session, Depends(get_session)]
):
    # check if the email already exists
    email_exists = session.exec(
        select(User).where(User.email == user_create.email)
    ).first()
    if email_exists:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Email already registered.",
        )

    # hash the password
    password_hash = hash_password(user_create.password)
    user = User(
        name=user_create.name,
        email=user_create.email,
        password_hash=password_hash,
    )

    session.add(user)
    # race condition handling: commit and refresh in a try-except block
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
                status_code=409, detail="Email already registered."
            ) from exc

        raise

    session.refresh(user)
    return user
