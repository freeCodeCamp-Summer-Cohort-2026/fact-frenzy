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
            raise ValueError("Name cannot be empty after removing whitespaces.")

        return name

class UserRead(UserBase):
    id: uuid.UUID
    created_at: datetime.datetime


class User(UserBase, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    created_at: datetime.datetime = Field(
        default_factory=lambda: datetime.datetime.now(datetime.UTC)
    )


class Category(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    name: str = Field(min_length=1, max_length=100, unique=True)


class Quiz(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    title: str = Field(min_length=1, max_length=200)
    description: str | None = Field(default=None, max_length=500)
    category_id: int = Field(foreign_key="category.id")


class Question(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    question: str = Field(min_length=1, max_length=500)

    option_a: str = Field(min_length=1, max_length=200)
    option_b: str = Field(min_length=1, max_length=200)
    option_c: str = Field(min_length=1, max_length=200)
    option_d: str = Field(min_length=1, max_length=200)

    correct_answer: str = Field(min_length=1, max_length=1)

    quiz_id: int = Field(foreign_key="quiz.id")
