import logging

from pwdlib import PasswordHash
from pwdlib.exceptions import UnknownHashError

password_hasher = PasswordHash.recommended()

logger = logging.getLogger(__name__)


def hash_password(plain_password: str) -> str:
    """Hash a plaintext password for storage."""
    return password_hasher.hash(plain_password)


def verify_password(plain_password: str, stored_hash: str) -> bool:
    """Verify a plaintext password against the stored hash."""
    try:
        return password_hasher.verify(plain_password, stored_hash)
    except UnknownHashError:
        logger.error("verify_password: unrecognised hash format for stored hash")
        return False