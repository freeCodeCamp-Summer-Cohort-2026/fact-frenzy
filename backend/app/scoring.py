import datetime
from uuid import UUID

from sqlmodel import Session, select

from app.models import Activity, Answers, Question

POINTS = 10


def apply_answer(score: int, is_correct: bool, is_challenge: bool) -> int:
    if is_correct:
        return score + POINTS
    else:
        if is_challenge:
            return max(0, score - POINTS)
    return score


def week_start(now: datetime.datetime) -> datetime.datetime:
    monday = now - datetime.timedelta(days=now.weekday())
    return monday.replace(hour=0, minute=0, second=0, microsecond=0)


def get_weekly_score(
    session: Session, now=None
) -> dict[
    UUID, int
]:  # Each UUID represents a user's ID, and the integer represents that user's weekly score
    start = week_start(now or datetime.datetime.now(datetime.UTC))
    rows = session.exec(
        select(Answers, Activity)
        .join(Question, Question.id == Answers.question_id)
        .join(Activity, Activity.id == Question.activity_id)
        .order_by(Answers.created_at)
    ).all()

    scores: dict[UUID, int] = {}
    seen_practice: set[tuple[UUID, int]] = set()
    seen_challenge: set[tuple[UUID, int]] = set()

    for answer, activity in rows:
        key = (answer.user_id, answer.question_id)
        is_challenge = activity.lab_id is not None
        in_week = answer.created_at >= start

        if is_challenge:
            if not in_week or key in seen_challenge:
                continue  # skip: old week OR already counted this week
            seen_challenge.add(key)
        else:
            if key in seen_practice:
                continue
            seen_practice.add(key)
            if not in_week:
                continue

        scores[answer.user_id] = apply_answer(
            scores.get(answer.user_id, 0), answer.is_correct, is_challenge
        )

    return scores


def get_lifetime_bank(user_id) -> int:
    # first submission per question, tutorial activities only
    # count the ones where is_correct is True
    return
