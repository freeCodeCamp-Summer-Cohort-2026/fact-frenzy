from uuid import UUID

from pydantic import BaseModel, EmailStr, Field


class SignupRequest(BaseModel):
    name: str
    email: EmailStr
    password: str = Field(min_length=8)


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