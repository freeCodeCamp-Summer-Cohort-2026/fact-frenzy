from fastapi import APIRouter
from sqlmodel import Session, select

from app.models import (
    Activity,
    ActivityRead,
    Option,
    OptionRead,
    Question,
    QuestionRead,
)

router = APIRouter(prefix="/labs", tags=["labs"])


def _build_question_read(question: Question, session: Session) -> QuestionRead:
    options = session.exec(
        select(Option).where(Option.question_id == question.id)
    ).all()
    return QuestionRead(
        id=question.id,
        text=question.text,
        options=[OptionRead(id=o.id, text=o.text) for o in options],
    )


def _build_activity_read(activity: Activity, session: Session) -> ActivityRead:
    questions = session.exec(
        select(Question).where(Question.activity_id == activity.id)
    ).all()
    return ActivityRead(
        id=activity.id,
        type=activity.type,
        prompt=activity.prompt,
        questions=[_build_question_read(q, session) for q in questions],
    )
