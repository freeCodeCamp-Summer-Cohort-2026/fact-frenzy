from pwdlib import PasswordHash

password_hasher = PasswordHash.recommended()


def hash_password(plain_password: str) -> str:
    """Hash a plaintext password for storage."""
    return password_hasher.hash(plain_password)


def verify_password(plain_password: str, stored_hash: str) -> bool:
    """Verify a plaintext password against the stored hash."""
    return password_hasher.verify(plain_password, stored_hash)