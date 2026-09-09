from sqlmodel import Session

from database import create_db_table, engine
from models import User

USERS = [
    {"name": "Alice Johnson", "email": "alice.johnson@example.com"},
    {"name": "Bob Smith", "email": "b.smith@testcorp.net"},
    {"name": "Charlie Brown", "email": "charlie_b@mail.org"},
    {"name": "Dana", "email": "dana@fastapi.io"},
    {"name": "Dr. Evelyn Reed-Jones", "email": "evelyn.rj@research.edu"},
]


def seed() -> None:
    create_db_table()

    with Session(engine) as session:
        users = [User(**data) for data in USERS]
        session.add_all(users)
        session.commit()
        for user in users:
            session.refresh(user)

    print(f"Seeded {len(USERS)} users.")


if __name__ == "__main__":
    seed()
