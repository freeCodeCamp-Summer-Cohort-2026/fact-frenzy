from typing import Annotated

from app.database import get_session
from app.models import User, UserLogin, UserRead
from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select

router = APIRouter(prefix="/users", tags=["users"])


# this route is only for testing if tables work so we can change or modify it in the way it should be.
@router.get("/", response_model=list[UserRead])
def get_users(session: Annotated[Session, Depends(get_session)]):
    statement = select(User)
    return session.exec(statement).all()


# Login route for users
@router.post("/login", response_model=UserRead)
def login_user(user_login: UserLogin, session: Annotated[Session, Depends(get_session)]):
    statement = select(User).where(User.email == user_login.email)
    user = session.exec(statement).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    # Check if the provided password matches the hashed password in the database

