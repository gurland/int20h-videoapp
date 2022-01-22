# `python-base` sets up all our shared environment variables
FROM python:3.8-slim

RUN apt update && apt-get upgrade -y

RUN apt install --no-install-recommends -y curl git

RUN curl -sSL https://raw.githubusercontent.com/sdispater/poetry/master/get-poetry.py | python3 && \
  ${HOME}/.poetry/bin/poetry config virtualenvs.create false
ENV PATH="root/.poetry/bin:${PATH}"

RUN apt install --no-install-recommends -y build-essential clang libpcre3-dev libz-dev python3-dev

# quicker install as runtime deps are already installed
COPY poetry.lock .
COPY pyproject.toml .
RUN poetry install

COPY . .
EXPOSE 5000
CMD ["uwsgi", "--ini", "uwsgi.ini"]