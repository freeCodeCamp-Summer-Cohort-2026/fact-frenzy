import logging
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import create_db_table
from app.routers import auth, users

logger = logging.getLogger("uvicorn.error")

import os

from dotenv import load_dotenv

FRONTEND_URL = os.getenv("FRONTEND_URL")

load_dotenv()


@asynccontextmanager
async def lifespan(app: FastAPI):
    try:
        create_db_table()
    except Exception:
        logger.exception("Failed to create database tables — aborting startup")
        raise
    yield


app = FastAPI(
    title="Fact Frenzy", description="", version="0.0.0", lifespan=lifespan
)

app.include_router(users.router)
app.include_router(auth.router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[FRONTEND_URL],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def main():
    return {"message": "Hello from backend!"}


if __name__ == "__main__":
    import uvicorn

    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
