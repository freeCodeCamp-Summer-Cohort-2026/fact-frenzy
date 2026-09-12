from sqlmodel import Session, select

from core.security import hash_password
from database import create_db_table, engine
from models import User


SEED_PASSWORD = "dev-password123"  # Default password for seeded users

USERS = [
    {
        "name": "Alice Johnson",
        "email": "alice.johnson@example.com",
        "is_admin": True,
        "hashed_password": "asdfghjkl",
    },
    {
        "name": "Bob Smith",
        "email": "b.smith@testcorp.net",
        "is_admin": False,
        "hashed_password": "123456",
    },
    {
        "name": "Charlie Brown",
        "email": "charlie_b@mail.org",
        "is_admin": False,
        "hashed_password": "qwerty",
    },
    {
        "name": "Dana",
        "email": "dana@fastapi.io",
        "is_admin": False,
        "hashed_password": "wasdwasd",
    },
    {
        "name": "Dr. Evelyn Reed-Jones",
        "email": "evelyn.rj@research.edu",
        "is_admin": True,
        "hashed_password": "lmnopqrs",
    },
]


def seed() -> None:
    create_db_table()

    with Session(engine) as session:
        for data in USERS:
            existing_user = session.exec(
                select(User).where(User.email == data["email"])
            ).first()

            if existing_user:
                continue

            password_hash = hash_password(SEED_PASSWORD)
            user = User(**data, password_hash=password_hash)
            session.add(user)

        session.commit()

    print(f"Seeded {len(USERS)} users.")


if __name__ == "__main__":
    seed()
