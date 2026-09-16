from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select

from app.database import get_session
from app.models import User, UserLogin, UserRead
from core.security import verify_password

router = APIRouter(prefix="/auth", tags=["auth"])


# Login route for users
@router.post("/login", response_model=UserRead)
def login_user(user_login: UserLogin, session: Annotated[Session, Depends(get_session)]):
    statement = select(User).where(User.email == user_login.email)
    user = session.exec(statement).first()
    if not user:
        raise HTTPException(status_code=404, detail="Email and password combination not found")

    # Check if the provided password matches the hashed password in the database
    if not verify_password(user_login.password, user.hashed_password):
        raise HTTPException(status_code=404, detail="Email and password combination not found")

    return user
