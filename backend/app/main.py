import logging
from contextlib import asynccontextmanager
from app.database import create_db_table
from fastapi import FastAPI
from app.routers import users

logger = logging.getLogger("uvicorn.error")

@asynccontextmanager
async def lifespan(app: FastAPI):
    try:
        create_db_table()
    except Exception:
        logger.exception("Failed to create database tables — aborting startup")
        raise
    yield


app = FastAPI(title="Fact Frenzy", description="", version="0.0.0", lifespan=lifespan)

app.include_router(users.router)


@app.get("/")
def main():
    return {"message": "Hello from backend!"}


if __name__ == "__main__":
    import uvicorn

    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
