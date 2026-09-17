FROM python:3.14

RUN pip install --no-cache-dir uv

WORKDIR /code

COPY pyproject.toml uv.lock ./

RUN uv sync --frozen --no-dev

#COPY ./requirements.txt /code/requirements.txt

#RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

COPY . .

CMD ["uv", "run", "fastapi", "run", "app/main.py", "--port", "8000"]