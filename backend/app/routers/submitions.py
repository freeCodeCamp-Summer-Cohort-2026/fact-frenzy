from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import func
from sqlmodel import Session, select

from app.database import get_session
from app.models import (
    Answers,
    Option,
    SubmissionCreate,
    User,
)
from app.routers.auth import get_current_user

router = APIRouter(prefix="/answers", tags=["submissions"])


@router.post("/{question_id}")
def submit_answer(
    question_id: int,
    body: SubmissionCreate,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user),
):

    option = session.get(Option, body.userAnswer)
    if option is None:
        raise HTTPException(status_code=404, detail="Option not found")

    # Find the selected option belonging to this question.
    option = session.exec(
        select(Option).where(
            Option.question_id == question_id,
        )
    ).first()

    if option is None:
        raise HTTPException(
            status_code=404,
            detail="Option not found for this question",
        )
        return

    # Check whether the selected option is correct.
    is_correct = option.question_id == question_id and option.is_correct

    previous_attempt = session.exec(
        select(func.max(Answers.attempt_number)).where(
            Answers.user_id == current_user.user_id,
            Answers.question_id == question_id,
        )
    ).one()

    # Save the answer.
    answer = Answers(
        user_id=current_user.user_id,
        question_id=question_id,
        submission_id=body.submission_id,
        answer=str(option.id),
        is_correct=is_correct,
        attempt_number=(previous_attempt or 0) + 1,
    )

    session.add(answer)
    session.commit()
    session.refresh(answer)
    return {
        "question_id": question_id,
        "selected_option_id": option.id,
        "selected_option": option.text,
        "is_correct": is_correct,
        "message": "Correct" if is_correct else "Incorrect",
        "answer_id": answer.id,
    }
