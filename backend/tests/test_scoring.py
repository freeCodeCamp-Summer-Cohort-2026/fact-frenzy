import datetime

from app.scoring import apply_answer, week_start


def test_wrong_challenge_answer_floors_at_zero():
    assert apply_answer(0, False, True) == 0


def test_wrong_practice_answer_changes_nothing():
    assert apply_answer(20, False, False) == 20


def test_week_start_is_monday_midnight():
    d = datetime.datetime(
        2026, 10, 22, 10, 30, tzinfo=datetime.UTC
    )  # a Thursday
    assert week_start(d) == datetime.datetime(
        2026, 10, 19, 0, 0, tzinfo=datetime.UTC
    )
