from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select

from app.database import get_session
from app.models import (
    Activity,
    ActivityRead,
    Option,
    OptionRead,
    Question,
    QuestionRead,
    Tutorial,
    TutorialRead,
)

router = APIRouter(prefix="/tutorials", tags=["tutorials"])


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


def _build_tutorial_read(tutorial: Tutorial, session: Session) -> TutorialRead:
    activities = session.exec(
        select(Activity).where(Activity.tutorial_id == tutorial.id)
    ).all()
    return TutorialRead(
        id=tutorial.id,
        title=tutorial.title,
        description=tutorial.description,
        module_id=tutorial.module_id,
        content=tutorial.content,
        activities=[_build_activity_read(a, session) for a in activities],
    )


@router.get("/", response_model=list[TutorialRead])
def list_tutorials(session: Session = Depends(get_session)):
    tutorials = session.exec(select(Tutorial)).all()
    return [_build_tutorial_read(t, session) for t in tutorials]


@router.get("/{tutorial_id}", response_model=TutorialRead)
def get_tutorial(tutorial_id: int, session: Session = Depends(get_session)):
    tutorial = session.get(Tutorial, tutorial_id)
    if tutorial is None:
        raise HTTPException(status_code=404, detail="Tutorial not found")

    return _build_tutorial_read(tutorial, session)
