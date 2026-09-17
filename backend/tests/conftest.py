import pytest
from fastapi.testclient import TestClient
from sqlmodel import Session, SQLModel, create_engine
from sqlmodel.pool import StaticPool

from app.database import get_session
from app.main import app

# in-memory SQLite DB
TEST_DATABASE_URL = "sqlite:///:memory:"


@pytest.fixture()
def db_session():
    # create a new database engine for each test
    engine = create_engine(
        TEST_DATABASE_URL,
        connect_args={"check_same_thread": False},
        poolclass=StaticPool,
    )

    # create the database tables
    SQLModel.metadata.create_all(engine)
    with Session(engine) as session:
        yield session
    SQLModel.metadata.drop_all(engine)


@pytest.fixture()
def client(db_session):
    # override the get_session dependency to use the test database session
    def get_test_session():
        yield db_session

    # override the dependency in the FastAPI app
    app.dependency_overrides[get_session] = get_test_session
    with TestClient(app) as client:
        yield client

    # clear the dependency override after the test
    app.dependency_overrides.clear()
