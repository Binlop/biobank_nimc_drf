FROM python:3.10-slim

ENV PYTHONUNBUFFERED 1

WORKDIR /app/
# ADD ./backend/requirements.txt /app/backend/
COPY ./poetry.lock pyproject.toml /app/


RUN pip install --upgrade pip
RUN pip install gunicorn

RUN pip3 install poetry
RUN poetry config virtualenvs.create false
RUN poetry install --no-dev

ADD ./docker /app/docker
ADD ./backend /app/backend