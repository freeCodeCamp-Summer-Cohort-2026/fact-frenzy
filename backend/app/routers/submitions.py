from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import func
from sqlalchemy.exc import IntegrityError
from sqlmodel import Session, select

from app.database import get_session
from app.models import Answers, Option, Question, SubmissionCreate, User
from app.routers.auth import get_current_user

router = APIRouter(prefix="/answers", tags=["submissions"])


@router.post("/{question_id}")
def submit_answer(
    question_id: int,
    body: SubmissionCreate,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user),
):
    question = session.get(Question, question_id)
    if question is None:
        raise HTTPException(status_code=404, detail="Question not found")

    option = session.get(Option, body.userAnswer)
    if option is None:
        raise HTTPException(status_code=404, detail="Option not found")

    # An option from a different question counts as a wrong answer
    is_correct = option.question_id == question_id and option.is_correct

    previous_attempt = session.exec(
        select(func.max(Answers.attempt_number)).where(
            Answers.user_id == current_user.id,
            Answers.question_id == question_id,
        )
    ).one()

    # Save the answer.
    answer = Answers(
        user_id=current_user.id,
        question_id=question_id,
        answer=str(option.id),
        is_correct=is_correct,
        attempt_number=(previous_attempt or 0) + 1,
    )

    try:
        session.add(answer)
        session.commit()
    except IntegrityError:
        session.rollback()
        raise HTTPException(
            status_code=409,
            detail="Concurrent submission for this question, please retry.",
        )
    session.refresh(answer)

    return {
        "question_id": question_id,
        "selected_option_id": option.id,
        "selected_option": option.text,
        "is_correct": is_correct,
        "message": "Correct" if is_correct else "Incorrect",
        "answer_id": answer.id,
    }
