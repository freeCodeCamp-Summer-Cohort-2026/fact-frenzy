from fastapi import FastAPI

from app.routers import auth, users


app = FastAPI(
    title="Fact Frenzy", description="", version="0.0.0"
)

app.include_router(users.router)
app.include_router(auth.router)


@app.get("/")
def main():
    return {"message": "Hello from backend!"}


if __name__ == "__main__":
    import uvicorn

    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
