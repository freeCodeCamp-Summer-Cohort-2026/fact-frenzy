from typing import Annotated

from fastapi import APIRouter, Depends
from sqlmodel import Session, select

from app.database import get_session
from app.models import User, UserRead

router = APIRouter(prefix="/users", tags=["users"])


# this route is only for testing if tables work so we can change or modify it in the way it should be.
@router.get("/", response_model=list[UserRead])
def get_users(session: Annotated[Session, Depends(get_session)]):
    statement = select(User)
    return session.exec(statement).all()
