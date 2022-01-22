SHELL = /bin/bash

VERSION := $(shell poetry run python -c "from importlib.metadata import version; print(version('api_gateway'))")

# Set .env variables for the Makefile context (only if .env file exists)
ifneq ($(wildcard .env),)
    include .env
	export $(shell sed 's/=.*//' .env)
endif


init:
	poetry install --extras "dev"


build: ## build docker image
	DOCKER_BUILDKIT=1 COMPOSE_DOCKER_CLI_BUILD=1 VERSION=${VERSION} \
      docker build . --progress=plain \
      -t ${ECR_URL}:latest -t ${ECR_URL}:${VERSION} \
      --build-arg VERSION=${VERSION}