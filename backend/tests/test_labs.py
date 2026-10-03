from backend.app.models import (
    Activity,
    Category,
    Lab,
    Module,
    Option,
    Question,
)
from fastapi.testclient import TestClient
from sqlmodel import Session, session


def create_matching_test_lab(client: Session):
    category = Category(name="Test Category")
    session.add(category)
    session.commit()
    session.refresh(category)

    module = Module(title="Test Module", category_id=category.id)
    session.add(module)
    session.commit()
    session.refresh(module)

    lab = Lab(title="test Lab", description="Test description", module_id=module.id)
    session.add(lab)
    session.commit()
    session.refresh(lab)

    activity = Activity(lab_id=lab.id, type="matching", prompt="Test Matching Prompt")
    session.add(activity)
    session.commit()
    session.refresh(activity)

    question1 = Question(activity_id=activity.id, text="Australia")
    question2 = Question(activity_id=activity.id, text="Canada")
    question3 = Question(activity_id=activity.id, text="Japan")
    question4 = Question(activity_id=activity.id, text="Germany")
    session.add_all([question1, question2, question3, question4])
    session.commit()
    session.refresh(question1)
    session.refresh(question2)
    session.refresh(question3)
    session.refresh(question4)

    option1 = Option(question_id=question1.id, text="Canberra", is_correct=True)
    option2 = Option(question_id=question2.id, text="Ottawa", is_correct=True)
    option3 = Option(question_id=question3.id, text="Tokyo", is_correct=True)
    option4 = Option(question_id=question4.id, text="Berlin", is_correct=True)
    session.add_all([option1, option2, option3, option4])
    session.commit()

    return lab, activity


def create_sorting_test_lab(client: Session):
    category = Category(name="Test Category")
    session.add(category)
    session.commit()
    session.refresh(category)

    module = Module(title="Test Module", category_id=category.id)
    session.add(module)
    session.commit()
    session.refresh(module)

    lab = Lab(title="test Lab", description="Test description", module_id=module.id)
    session.add(lab)
    session.commit()
    session.refresh(lab)

    activity = Activity(lab_id=lab.id, type="sorting", prompt="Test Sorting Prompt")
    session.add(activity)
    session.commit()
    session.refresh(activity)

    question1 = Question(activity_id=activity.id, text="The sky is blue")
    question2 = Question(activity_id=activity.id, text="The grass is green")
    session.add_all([question1, question2])
    session.commit()
    session.refresh(question1)
    session.refresh(question2)

    session.add_all([
      Option(question_id=question1.id, text="True", is_correct=True),
      Option(question_id=question1.id, text="Untrue", is_correct=False),
      Option(question_id=question2.id, text="True", is_correct=True),
      Option(question_id=question2.id, text="Untrue", is_correct=False),
    ])
    session.commit()

    return lab, activity


def test_list_labs_returns_all_labs(client: TestClient):
    response = client.get("/labs")
    assert response.status_code == 200
    body = response.json()
    assert isinstance(body, list)
    for lab in body:
        assert "id" in lab
        assert "name" in lab


def test_get_lab_id_returns_correct_lab(client: TestClient):
    client.post("/labs/activities", json={"name": "New Activity"})
    
    response = client.get("/labs/activities/1")
    assert response.status_code == 200
    body = response.json()
    assert "id" in body
    assert "name" in body
    assert body["id"] == 1



