#####################################################
# Make sinergy application
#####################################################
# If the first argument is "run"...
ifeq (run,$(firstword $(MAKECMDGOALS)))
  # use the rest as arguments for "run"
  RUN_ARGS := $(wordlist 2,$(words $(MAKECMDGOALS)),$(MAKECMDGOALS))
  # ...and turn them into do-nothing targets
  $(eval $(RUN_ARGS):;@:)
endif

MAKEFLAGS += --warn-undefined-variables
SHELL := /bin/bash
.SHELLFLAGS := -o pipefail -euc
.DEFAULT_GOAL := build

.PHONY: all

ROOT := $(shell pwd)
SERVICES_PATH := ${ROOT}/services

## display this help message
help:
	@echo -e "\033[32m"
	@echo "Display help here"

build:
	@echo "Build everything"
run:
	@echo "Run everything"
	docker-compose -f docker/compose.dev.yml up --build $(RUN_ARGS)
stop:
	@echo "Stoping sinergy"
	docker stop $(docker ps -a | grep 'sinergy' | cut -f1 -d ' ')

ps:
	@echo "Show sinergy"
	docker ps $(docker ps -a | grep 'sinergy' | cut -f1 -d ' ')

### API ###
build/api:
	cd ${SERVICES_PATH}/api \
		&& sh ./scripts/build.sh
run/api:
	cd ${SERVICES_PATH}/api \
		&& sh ./scripts/run.sh \
		&& docker logs sinergy-api -f
stop/api:
	docker stop sinergy-api
info/api:
	@echo -e "\033[32m"
	@echo "------------------------------------------------------------------"
	@echo Container - sinergy-api
	@echo IP - $(call get_IP,sinergy-api)
	@echo "------------------------------------------------------------------"

### DB ###
build/db:
	cd ${SERVICES_PATH}/db \
		&& sh ./scripts/build.sh
run/db:
	cd ${SERVICES_PATH}/db \
		&& sh ./scripts/run.sh \
		&& docker logs sinergy-db -f
stop/db:
	docker stop sinergy-db
info/db:
	@echo -e "\033[32m"
	@echo "------------------------------------------------------------------"
	@echo Container - sinergy-db
	@echo IP - $(call get_IP,sinergy-db)
	@echo "------------------------------------------------------------------"

### UI ###
build/ui:
	cd ${SERVICES_PATH}/ui \
		&& sh ./scripts/build.sh
run/ui:
	cd ${SERVICES_PATH}/ui \
		&& sh ./scripts/run.sh \
		&& docker logs sinergy-ui -f
stop/ui:
	docker stop sinergy-ui

### NGINX ###
nginx/reload:
	@docker exec sinergy-nginx-proxy nginx -s reload


### CLEAN UP ###
clean/all:
	docker system prune -a
clean/images:
	docker rmi $(docker images --filter "dangling=true" -q --no-trunc) -f

define get_IP
	$(shell docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' $1)
endef

