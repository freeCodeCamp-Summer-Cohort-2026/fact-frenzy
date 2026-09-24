FROM python:3.14

RUN pip install --no-cache-dir uv

WORKDIR /code

COPY pyproject.toml uv.lock ./

ENV UV_LINK_MODE=copy

RUN --mount=type=cache,target=/root/.cache/uv \
    uv sync --frozen --no-dev

#COPY ./requirements.txt /code/requirements.txt

#RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

COPY . .

CMD ["uv", "run", "--no-sync", "fastapi", "run", "app/main.py", "--port", "8000"]