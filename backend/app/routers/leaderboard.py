from typing import Annotated

from fastapi import APIRouter, Depends
from sqlmodel import Session, select

from app.database import get_session
from app.models import User
from app.routers.auth import get_current_user
from app.scoring import get_lab_scores, get_lifetime_bank, get_weekly_score

router = APIRouter(tags=["leaderboard"])


@router.get("/leaderboard")
def leaderboard(
    current_user: Annotated[User, Depends(get_current_user)],
    session: Session = Depends(get_session),
):
    scores = get_weekly_score(session)
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


@router.get("/scores/me")
def my_scores(
    current_user: Annotated[User, Depends(get_current_user)],
    session: Session = Depends(get_session),
    lab_id: int | None = None,
):
    weekly = get_weekly_score(session)
    lab_scores = get_lab_scores(session, current_user.id)
    if lab_id is not None:
        lab_scores = {lab_id: lab_scores.get(lab_id, 0)}
    return {
        "weekly_score": weekly.get(current_user.id, 0),
        "lifetime_bank": get_lifetime_bank(session, current_user.id),
        "lab_scores": [
            {"lab_id": lid, "score": score}
            for lid, score in lab_scores.items()
        ],
    }
