# Fact Frenzy 

A platform for learning general-knowledge science topics in a fun, gamified way.

## Summary

**Practice mode:** 

- Each fact card presents a single piece of information based on a chosen topic. Below the card is a panel with three drop points: True, Untrue, Myth
- The user drags the card into the zone they believe to be correct. 
- A correct point placement adds one point to a users Bank (lifetime/permanent). 
- Incorrect placements have no penalty and do not earn a point at all. 
- Practice mode is unlimited and does not have any pressure or penalty. 
- Points are earned once per card, on the first attempt only, retries, or repeated attempts on a card already answered should not add any further points. 


**Challenge mode (weakest link):**

*Same core mechanic as practice mode with the following differences.*

- Mode is timed. 
- Meant to test what a user has learned in Practice mode. 
- Correctly placing a card earns points toward users weekly leaderboard point score (but NOT the lifetime bank)
- Incorrect placement of cards deducts points in challenge mode from the weekly leaderboard, which has a floor of **zero**. So that it can never drop BELOW zero. 
- Challenge mode while it takes point on incorrect answers and deducts from leaderboard, it does not ever deduct from the lifetime bank. 
- Bank is only ever added to and in one mode: *practice mode*. 
- Repeated attempts at the same challenge are limited on purpose to prevent point farming by replaying an easy topic repeatedly. 

**Leaderboard:**

- Ranks by users earned within the current week only. 
- Resets weekly at a fixed day and time. 
- Lifetime bank is not shown on or used by the leaderboard, they are not the same systems. It will persist on the users profile independently. 

**Streaks:**

- A streak increases when a user has a correct answer on any given day either in practice or challenge mode. 
- Streaks carry over day to day as long as the user logs in/maintains daily activity. Missing a day resets streak to zero. 
- Streaks do not affect lifetime bank or weekly leaderboard points directly. Losing a streak never removes points already earned. 

**Bank:**

- Permanent lifetime points on users account, increases per correct answer in practice mode. 
- Never decreases.
- Long-term record of users correct answers. 


## Tech Stack

- **Frontend**: TypeScript + React + Next.js
- **Backend**: Python + FastAPI
- **Database**: PostgreSQL + SQLModel
- **Containerization**: Docker

## Quick Start

#### Installation

**Clone the repo**

```bash
git clone https://github.com/freeCodeCamp-Summer-Cohort-2026/fact-frenzy.git
```

#### Frontend

##### **Install dependencies**

```bash
cd frontend
npm install
```

##### **Frontend development**

```bash
cd frontend
npm run dev
```

Go to [http://localhost:3000](http://localhost:3000) in a browser to view the website locally.

#### Backend

##### **Set up environment variables**
```bash
cp backend/.env.example backend/.env
```

##### **Docker setup and startup**
```bash
cd backend/
docker-compose up --build

# Check containers
# docker compose up -d

# Close with 
# docker-compose down
```

The API will be available at `http://localhost:8000`. Interactive docs
(Swagger UI) are at `http://localhost:8000/docs`.

Tables are created automatically on startup - there's no migration step to
run. To load some examples once the stack is up:

```bash
docker-compose exec api python seed.py
```

##### **Alternative - Run API locally (with database running via Docker)**
```bash
cd backend

# Launch db after running docker compose
docker-compose up db
```

```bash
cd backend

# Setup virtual environment
uv sync --frozen --no-dev # remove --no-dev if planning to contribute

# If using pip instead, may need to update the requirements.txt file
# uv export --format requirements-txt --no-dev --no-emit-project --output-file requirements.txt

# Point DATABASE_URL at a Postgres instance you have running, e.g. one
# started with `docker-compose up db`.
# Replace ${POSTGRES_USER} with the actual POSTGRES_USER in .env file
# Same with ${POSTGRES_PASSWORD} and ${POSTGRES_DB}
export DATABASE_URL=postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@localhost:5432/${POSTGRES_DB}

# Seed database if needed
uv run backend/seed.py

# Run API locally
uv run uvicorn app.main:app --reload
```

## Repository structure

_A tree diagram of folders and files; to be added later_

## API endpoints

_To be added later_

## Examples

_Add example usage here with screenshots_

## Testing

_Add info here on how to test_

## Contributing

See [CONTRIBUTING.md](https://github.com/freeCodeCamp-Summer-Cohort-2026/fact-frenzy/blob/main/CONTRIBUTING.md) for the issue claiming and PR workflows, as well as naming conventions for branches, commits and PRs.

## License

This project is licensed under the MIT License. See [LICENSE.md](LICENSE.md) for details.


