from app.database import get_session
from app.models import (
    Answers,
    Option,
    SubmissionCreate,
)
from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select

router = APIRouter(prefix="/answers", tags=["submissions"])


@router.post("/{question_id}")
def submit_answer(
    question_id: int,
    body: SubmissionCreate,
    session: Session = Depends(get_session),
):
    # Find the selected option belonging to this question.
    option = session.exec(
        select(Option).where(
            Option.id == body.userAnswer,
            Option.question_id == question_id,
        )
    ).first()

    if option is None:
        raise HTTPException(
            status_code=404,
            detail="Option not found for this question",
        )

    # Check whether the selected option is correct.
    is_correct = option.is_correct

    # Save the answer.
    answer = Answers(
        question_id=question_id,
        submission_id=body.submission_id,
        answer=str(option.id),
        is_correct=is_correct,
        attempt_number=1,
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
