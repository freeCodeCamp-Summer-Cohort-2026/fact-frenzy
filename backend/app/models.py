import datetime
from uuid import UUID, uuid4
from pydantic import EmailStr, field_validator
from sqlmodel import Field, SQLModel


class UserBase(SQLModel):
    name: str = Field(min_length=1, max_length=100)
    email: EmailStr = Field(max_length=100, unique=True, index=True)


class UserCreate(UserBase):
    password: str = Field(min_length=8, max_length=128)


class UserRead(UserBase):
    id: UUID
    created_at: datetime.datetime
    is_admin: bool


class User(SQLModel, table=True):
    id: UUID = Field(
        default_factory=uuid4,
        primary_key=True
    )

    name: str = Field(max_length=100)

    email: str = Field(
        max_length=100,
        unique=True,
        index=True
    )

    password_hash: str

    is_admin: bool = Field(default=False)

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

    @field_validator("correct_answer")
    @classmethod
    def validate_correct_answer(cls, value: str) -> str:
        value = value.upper()

        if value not in {"A", "B", "C", "D"}:
            raise ValueError("Correct answer must be A, B, C, or D.")

        return value

    quiz_id: int = Field(foreign_key="quiz.id")
