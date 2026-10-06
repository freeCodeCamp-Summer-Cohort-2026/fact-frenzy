import logging
from contextlib import asynccontextmanager

from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from sqlalchemy.exc import SQLAlchemyError

from app.database import create_db_table
from app.routers import auth, labs, tutorials, users

logger = logging.getLogger("uvicorn.error")


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


@app.exception_handler(SQLAlchemyError)
async def db_exception_handler(request: Request, exc: SQLAlchemyError):
    logger.exception("Database error while handling request")
    return JSONResponse(
        status_code=500,
        content={
            "detail": "A database error occurred. Please try again later."
        },
    )


app.include_router(users.router)
app.include_router(auth.router)
app.include_router(labs.router)
app.include_router(tutorials.router)


@app.get("/")
def main():
    return {"message": "Hello from backend!"}


if __name__ == "__main__":
    import uvicorn

    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
