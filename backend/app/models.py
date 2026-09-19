import datetime
import uuid

from pydantic import EmailStr, field_validator
from sqlmodel import Field, SQLModel


class UserBase(SQLModel):
    name: str = Field(min_length=1, max_length=100)
    email: EmailStr = Field(max_length=100, unique=True, index=True)

    @field_validator("name")
    @classmethod
    def validate_name(cls, name: str) -> str:
        name = " ".join(name.split())

        if not name:
            raise ValueError(
                "Name cannot be empty after removing whitespaces."
            )

        return name

    @field_validator("email", mode="before")
    @classmethod
    def normalize_email(cls, email: str) -> str:
        email = email.strip().lower()

        if not email:
            raise ValueError("Email cannot be empty.")

        return email


class UserRead(UserBase):
    id: uuid.UUID
    created_at: datetime.datetime
    is_admin: bool


class UserCreate(UserBase):
    password: str = Field(min_length=8, max_length=128)


class User(UserBase, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    created_at: datetime.datetime = Field(
        default_factory=lambda: datetime.datetime.now(datetime.UTC)
    )
    password_hash: str = Field(min_length=1, max_length=1024)
    is_admin: bool = Field(default=False)


class Category(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    name: str = Field(min_length=1, max_length=100, unique=True)


class Lab(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    title: str = Field(min_length=1, max_length=200)
    description: str | None = Field(default=None, max_length=500)
    category_id: int = Field(foreign_key="category.id")

class Activity(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    lab_id: int = Field(foreign_key="lab.id")
    type: str # "matching" | "sorting" - extensible for future types
    prompt: str | None = None # e.g. instructions


class Question(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    activity_id: int = Field(foreign_key="activity.id")
    text: str = Field(max_length=500)  # e.g. "Australia" or the fact statement for sorting

class Option(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    question_id: int = Field(foreign_key="question.id")
    text: str = Field(max_length=500)  # e.g. "Canberra" or "True"/"Untrue"
    is_correct: bool # whether this specific option is the correct answer for its question

class OptionRead(SQLModel):
    id: int
    text: str
    # is_boolean is intentionally left out here
    # so that we don't send the answer to the frontend before the user submits

class QuestionRead(SQLModel):
    id: int
    text: str
    options: list[OptionRead] = []

class ActivityRead(SQLModel):
    id: int
    type: str
    prompt: str | None
    questions: list[QuestionRead] = []

class LabRead(SQLModel):
    id: int
    title: str
    description: str | None
    activities: list[ActivityRead] = []

