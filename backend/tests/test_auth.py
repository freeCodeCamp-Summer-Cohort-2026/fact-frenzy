from fastapi.testclient import TestClient


def test_signup_creates_user(client: TestClient):
    user_data = {
        "name": "Jane Doe",
        "email": "jane.doe@example.com",
        "password": "Supersecretpassword123",
    }
    response = client.post("/auth/signup", json=user_data)

    assert response.status_code == 201
    body = response.json()

    assert body["name"] == "Jane Doe"
    assert body["email"] == "jane.doe@example.com"

    assert "id" in body
    assert "is_admin" in body

    assert "password" not in body
    assert "password_hash" not in body


def test_signup_duplicate_email_returns_409(client: TestClient):
    user_data = {
        "name": "Sam Smith",
        "email": "sam.smith@example.com",
        "password": "Superpassword001",
    }
    response1 = client.post("/auth/signup", json=user_data)

    assert response1.status_code == 201

    response2 = client.post("/auth/signup", json=user_data)

    assert response2.status_code == 409
    assert response2.json()["detail"] == "Email already registered."


def test_signup_weak_password_returns_422(client: TestClient):
    user_data = {
        "name": "Test User",
        "email": "test.user01@gmail.com",
        "password": "Test123",
    }
    response = client.post("/auth/signup", json=user_data)
    body = response.json()

    assert response.status_code == 422
    assert any(
        error["loc"] == ["body", "password"] for error in body["detail"]
    )


def test_signup_missing_password_returns_422(client: TestClient):
    user_data = {
        "name": "Test User",
        "email": "test.user01@gmail.com",
    }
    response = client.post("/auth/signup", json=user_data)
    body = response.json()

    assert response.status_code == 422
    assert any(
        error["loc"] == ["body", "password"] for error in body["detail"]
    )


def test_signup_normalizes_email_and_rejects_duplicate(client: TestClient):
    user_data1 = {
        "name": "Jane Doe",
        "email": "Jane.doe@example.com",
        "password": "Cookiejar123",
    }
    response1 = client.post("/auth/signup", json=user_data1)

    assert response1.status_code == 201
    body = response1.json()
    assert body["email"] == "jane.doe@example.com"

    user_data2 = {
        "name": "Jane Doe",
        "email": "jane.doe@example.com",
        "password": "Cookiejar123",
    }
    response2 = client.post("/auth/signup", json=user_data2)

    assert response2.status_code == 409
    assert response2.json()["detail"] == "Email already registered."


def test_login_success(client: TestClient):
    client.post("/auth/signup", json={
        "name": "Jane Doe",
        "email": "jane.doe@example.com",
        "password": "Supersecretpassword123",
    })
    response = client.post("/auth/signin", json={
        "email": "jane.doe@example.com",
        "password": "Supersecretpassword123",
    })

    assert response.status_code == 200
    body = response.json()
    assert "access_token" in body
    assert "token_type" in body
    assert body["token_type"] == "bearer"


def test_login_invalid_password_returns_401(client: TestClient):
    client.post("/auth/signup", json={
        "name": "Jane Doe",
        "email": "jane.doe@example.com",
        "password": "Supersecretpassword123",
    })
    response = client.post("/auth/signin", json={
        "email": "jane.doe@example.com",
        "password": "Wrongpassword123",
    })

    assert response.status_code == 401
    assert response.json()["detail"] == "Invalid email or password."


def test_login_unknown_email_returns_401(client: TestClient):
    response = client.post("/auth/signin", json={
        "email": "unknown.email@example.com",
        "password": "Supersecretpassword123",
    })

    assert response.status_code == 401
    assert response.json()["detail"] == "Invalid email or password."
    
