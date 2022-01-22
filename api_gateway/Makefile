SHELL = /bin/bash

# Set .env variables for the Makefile context (only if .env file exists)
ifneq ($(wildcard .env),)
    include .env
	export $(shell sed 's/=.*//' .env)
endif

init:
	poetry install


build: ## build docker image
	DOCKER_BUILDKIT=1 COMPOSE_DOCKER_CLI_BUILD=1 VERSION=${VERSION} \
      docker build . --progress=plain \
      -t ${ECR_URL}:latest -t ${ECR_URL}:api_gateway
