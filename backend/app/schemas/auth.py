from uuid import UUID

from pydantic import BaseModel, EmailStr, Field, field_validator


class SignupRequest(BaseModel):
    name: str = Field(min_length=1, max_length=100)
    email: EmailStr = Field(max_length=100)
    password: str = Field(min_length=8, max_length=128)

    @field_validator("name", mode="before")
    @classmethod
    def validate_name(cls, name: str) -> str:
        if isinstance(name, str):
            name = " ".join(name.split())
            if not name:
                raise ValueError(
                    "Name cannot be empty after removing whitespaces."
                )
        return name

    @field_validator("email", mode="before")
    @classmethod
    def normalize_email(cls, email: str) -> str:
        if isinstance(email, str):
            email = email.strip().lower()
            if not email:
                raise ValueError("Email cannot be empty.")
        return email


class SigninRequest(BaseModel):
    email: EmailStr
    password: str


class TokenResponse(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"


class UserResponse(BaseModel):
    id: UUID
    name: str
    email: EmailStr
    is_admin: bool
