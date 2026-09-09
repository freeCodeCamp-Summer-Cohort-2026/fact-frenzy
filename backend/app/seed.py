from sqlmodel import Session, select

from database import create_db_table, engine
from models import User

USERS = [
    {"name": "Alice Johnson", "email": "alice.johnson@example.com", "is_admin": True},
    {"name": "Bob Smith", "email": "b.smith@testcorp.net", "is_admin": False},
    {"name": "Charlie Brown", "email": "charlie_b@mail.org", "is_admin": False},
    {"name": "Dana", "email": "dana@fastapi.io", "is_admin": False},
    {"name": "Dr. Evelyn Reed-Jones", "email": "evelyn.rj@research.edu", "is_admin": True},
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

            user = User(**data)
            session.add(user)

        session.commit()

    print(f"Seeded {len(USERS)} users.")


if __name__ == "__main__":
    seed()
