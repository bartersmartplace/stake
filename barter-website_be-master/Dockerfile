FROM python:3.10-slim

RUN apt-get update && \
    apt-get install -y libpq-dev gcc

WORKDIR /app

RUN pip install pipenv
COPY Pipfile.lock /app
COPY Pipfile /app

RUN pipenv install --system --deploy --ignore-pipfile

USER 1001:1001

COPY src/ /app