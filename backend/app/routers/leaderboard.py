from typing import Annotated

from fastapi import APIRouter, Depends
from sqlmodel import Session, select

from app.database import get_session
from app.models import User
from app.routers.auth import get_current_user

router = APIRouter(tags=["leaderboard"])


@router.get("/leaderboard")
def leaderboard(
    current_user: Annotated[User, Depends(get_current_user)],
    session: Session = Depends(get_session),
):
    scores = get_weekly_scores(session)
    users = {
        u.id: u
        for u in session.exec(
            select(User).where(User.id.in_(list(scores)))
        ).all()
    }
    ranked = sorted(
        scores.items(),
        key=lambda kv: (
            -kv[1],
            users[kv[0]].name,
        ),  # sort from hightest score to lowest; if same score, sort according to name (alphabetically)
    )
    return [
        {
            "rank": i,
            "username": users[uid].name,
            "avatar_url": None,
            "score": s,
        }
        for i, (uid, s) in enumerate(ranked, start=1)
    ]
