import datetime
import uuid

from jose import JWTError, jwt
from pwdlib import PasswordHash

from app.core.config import settings

password_hasher = PasswordHash.recommended()


def hash_password(password: str) -> str:
    """Hash a plaintext password."""
    return password_hasher.hash(password)


def verify_password(
    plain_password: str,
    hashed_password: str,
) -> bool:
    """Verify a plaintext password against its hash."""
    return password_hasher.verify(
        plain_password,
        hashed_password,
    )


def create_access_token(user_id: uuid.UUID) -> str:
    """Create a short-lived access token."""

    expire = datetime.datetime.now(datetime.UTC) + datetime.timedelta(
        minutes=settings.access_token_expire_minutes
    )

    payload = {
        "sub": str(user_id),
        "type": "access",
        "exp": expire,
    }

    return jwt.encode(
        payload,
        settings.secret_key,
        algorithm=settings.algorithm,
    )


def create_refresh_token(user_id: uuid.UUID) -> str:
    """Create a long-lived refresh token."""

    expire = datetime.datetime.now(datetime.UTC) + datetime.timedelta(
        days=settings.refresh_token_expire_days
    )

    payload = {
        "sub": str(user_id),
        "type": "refresh",
        "exp": expire,
    }

    return jwt.encode(
        payload,
        settings.secret_key,
        algorithm=settings.algorithm,
    )


def verify_token(
    token: str,
    token_type: str = "access",
) -> uuid.UUID:
    """Verify a JWT and return the user ID."""

    try:
        payload = jwt.decode(
            token,
            settings.secret_key,
            algorithms=[settings.algorithm],
        )

        user_id = payload.get("sub")
        token_type_from_payload = payload.get("type")

        if not user_id:
            raise ValueError("Token does not contain a user ID.")

        if token_type_from_payload != token_type:
            raise ValueError("Invalid token type.")

        return uuid.UUID(user_id)

    except JWTError, ValueError:
        raise ValueError("Invalid or expired token.")
