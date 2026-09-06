"""
database Engine and session setup
"""

from sqlmodel import Session, SQLModel, create_engine
from dotenv import load_dotenv
import os

load_dotenv()

DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "postgresql://factfrenzy:factfrenzy-dev-password@localhost:5432/factfrenzy-db",
)


engine = create_engine(DATABASE_URL, echo=False)


def create_db_table() -> None:
    SQLModel.metadata.create_all(engine)


def get_session():
    with Session(engine) as session:
        yield session
