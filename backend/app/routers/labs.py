from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select

from app.database import get_session
from app.models import (
    Activity,
    ActivityRead,
    Lab,
    LabRead,
    Option,
    OptionRead,
    Question,
    QuestionRead,
    User,
)
from app.routers.auth import get_current_user

router = APIRouter(prefix="/labs", tags=["labs"])


def _build_question_read(question: Question, session: Session) -> QuestionRead:
    assert question.id is not None
    options = session.exec(
        select(Option).where(Option.question_id == question.id)
    ).all()

    options_read = []
    for o in options:
        assert o.id is not None
        options_read.append(OptionRead(id=o.id, text=o.text))

    return QuestionRead(
        id=question.id,
        text=question.text,
        options=options_read,
    )


def _build_activity_read(activity: Activity, session: Session) -> ActivityRead:
    assert activity.id is not None
    questions = session.exec(
        select(Question).where(Question.activity_id == activity.id)
    ).all()
    return ActivityRead(
        id=activity.id,
        type=activity.type,
        prompt=activity.prompt,
        questions=[_build_question_read(q, session) for q in questions],
    )


def _build_lab_read(lab: Lab, session: Session) -> LabRead:
    assert lab.id is not None
    activities = session.exec(
        select(Activity).where(Activity.lab_id == lab.id)
    ).all()
    return LabRead(
        id=lab.id,
        title=lab.title,
        description=lab.description,
        module_id=lab.module_id,
        activities=[_build_activity_read(a, session) for a in activities],
    )


@router.get("/", response_model=list[LabRead])
def list_labs(
    current_user: Annotated[User, Depends(get_current_user)],
    session: Session = Depends(get_session),
):
    labs = session.exec(select(Lab)).all()
    return [_build_lab_read(lab, session) for lab in labs]


@router.get(
    "/{lab_id}", response_model=LabRead
)  # we're getting an individual lab here
def get_lab(
    lab_id: int,
    current_user: Annotated[User, Depends(get_current_user)],
    session: Session = Depends(get_session),
):
    lab = session.get(Lab, lab_id)
    if lab is None:
        raise HTTPException(status_code=404, detail="Lab not found")

    return _build_lab_read(lab, session)


@router.get("/activities/{activity_id}", response_model=ActivityRead)
def get_activity(
    activity_id: int,
    current_user: Annotated[User, Depends(get_current_user)],
    session: Session = Depends(get_session),
):
    activity = session.exec(
        select(Activity).where(
            Activity.id == activity_id,
            Activity.lab_id.is_not(None),
        )
    ).first()
    if activity is None:
        raise HTTPException(status_code=404, detail="Activity not found")

    return _build_activity_read(activity, session)
