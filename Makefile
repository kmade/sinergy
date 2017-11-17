
#####################################################
# Make the sinergy
#####################################################

#MAKEFLAGS += --warn-undefined-variables
SHELL := /bin/bash
.SHELLFLAGS := -o pipefail -euc
.DEFAULT_GOAL := up

.PHONY: all clean test run up stop exec build nginx logs ssl

ROOT := $(shell pwd)
SERVICES_PATH := ${ROOT}/services
SINERGY_PS = `docker-compose -f docker/compose.dev.yml ps | grep 'sinergy'`
SINERGY_PS_IDS = `docker ps -a | grep 'sinergy' | cut -f1 -d ' '`
LINE = '______________________________________________________________________________________________'
## display this help message
help:
	@echo -e "\033[32m"
	@echo "Display help here"


### Install ###

install:
	#npm install --registry https://registry.npmjs.org/ --loglevel error --progress false

### INFO ###
info:

	@echo -e "\033[32m"
	$(info $(ANNOUNCE_BODY))
	@echo "sINerGy Running containers"
	@echo "${SINERGY_PS}"
	@echo $(LINE)
	@echo sinergy.polymer-app
	@echo Url: https://polymer.sinergy.localhost
	@echo IP - $(call get_IP,sinergy.polymer-app)
	@echo $(LINE)
	@echo sinergy.react-app
	@echo Url: https://react.sinergy.localhost
	@echo IP - $(call get_IP,sinergy.react-app)
	@echo $(LINE)
	@echo sinergy.api
	@echo IP - $(call get_IP,sinergy.api)
	@echo $(LINE)
	@echo sinergy.db
	@echo IP - $(call get_IP,sinergy.db)
	@echo $(LINE)
	@echo sinergy.bus
	@echo IP - $(call get_IP,sinergy.bus)
	@echo $(LINE)

	@echo sinergy.micro-hello
	@echo IP - $(call get_IP,sinergy.micro-hello)
	@echo $(LINE)


up:
	$(info $(ANNOUNCE_BODY))
	docker-compose -f docker/compose.dev.yml up --build $(UP_ARGS)

run:
	docker-compose -f docker/compose.dev.yml run --rm --no-deps $(RUN_ARGS)

exec:
	docker-compose -f docker/compose.dev.yml exec $(EXEC_ARGS)

logs:
	docker-compose -f docker/compose.dev.yml logs -f $(LOGS_ARGS)

test:
	docker-compose -f docker/compose.dev.yml -f docker/compose.test.yml run --rm --no-deps $(TEST_ARGS)

stop:
	docker-compose -f docker/compose.dev.yml stop $(STOP_ARGS)

restart:
	docker-compose -f docker/compose.dev.yml restart $(RS_ARGS)

ssl:
	cd configuration/ssl/ && sh generate.sh


### Build ###
build:
	docker-compose -f docker/compose.dev.yml build $(BUILD_ARGS)

### NGINX ###
nginx/reload:
	@docker exec sinergy-nginx-proxy nginx -s reload

### CLEAN UP ###
clean/all:
	docker system prune -a
clean/images:
	@docker rmi `docker images --filter "dangling=true" -q --no-trunc` -f
clean/containers:
	@docker rm -f `docker ps -a -q`
clean/volumes:
	@docker volume rm $(docker volume ls -f dangling=true -q)

define get_IP
	$(shell docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' $1)
endef

define ANNOUNCE_BODY

         ooooo ooooo      ooo                      .oooooo.
         `888' `888b.     `8'                     d8P'  `Y8b
 .oooo.o  888   8 `88b.    8   .ooooo.  oooo d8b 888           oooo    ooo
d88(  "8  888   8   `88b.  8  d88' `88b `888""8P 888            `88.  .8'
`"Y88b.   888   8     `88b.8  888ooo888  888     888     ooooo   `88..8'
o.  )88b  888   8       `888  888    .o  888     `88.    .88'     `888'
8""888P' o888o o8o        `8  `Y8bod8P' d888b     `Y8bood8P'       .8'
                                                               .o..P'
                                                               `Y8P'
endef

## Too much duplication here, just make it DRY ...
# If the first argument is "run"...
ifeq (run,$(firstword $(MAKECMDGOALS)))
  # use the rest as arguments for "run"
  RUN_ARGS := $(wordlist 2,$(words $(MAKECMDGOALS)),$(MAKECMDGOALS))
  # ...and turn them into do-nothing targets
  $(eval $(RUN_ARGS):;@:)
endif
ifeq (exec,$(firstword $(MAKECMDGOALS)))
  # use the rest as arguments for "exec"
  EXEC_ARGS := $(wordlist 2,$(words $(MAKECMDGOALS)),$(MAKECMDGOALS))
  # ...and turn them into do-nothing targets
  $(eval $(EXEC_ARGS):;@:)
endif
ifeq (test,$(firstword $(MAKECMDGOALS)))
  # use the rest as arguments for "test"
  TEST_ARGS := $(wordlist 2,$(words $(MAKECMDGOALS)),$(MAKECMDGOALS))
  $(eval $(TEST_ARGS):;@:)
endif
ifeq (build,$(firstword $(MAKECMDGOALS)))
  # use the rest as arguments for "build"
  BUILD_ARGS := $(wordlist 2,$(words $(MAKECMDGOALS)),$(MAKECMDGOALS))
  # ...and turn them into do-nothing targets
  $(eval $(BUILD_ARGS):;@:)
endif
ifeq (up,$(firstword $(MAKECMDGOALS)))
  # use the rest as arguments for "up"
  UP_ARGS := $(wordlist 2,$(words $(MAKECMDGOALS)),$(MAKECMDGOALS))
  # ...and turn them into do-nothing targets
  $(eval $(UP_ARGS):;@:)
endif
ifeq (stop,$(firstword $(MAKECMDGOALS)))
  # use the rest as arguments for "up"
  STOP_ARGS := $(wordlist 2,$(words $(MAKECMDGOALS)),$(MAKECMDGOALS))
  # ...and turn them into do-nothing targets
  $(eval $(STOP_ARGS):;@:)
endif

ifeq (restart,$(firstword $(MAKECMDGOALS)))
  # use the rest as arguments for "up"
  RS_ARGS := $(wordlist 2,$(words $(MAKECMDGOALS)),$(MAKECMDGOALS))
  # ...and turn them into do-nothing targets
  $(eval $(RS_ARGS):;@:)
endif

ifeq (logs,$(firstword $(MAKECMDGOALS)))
  # use the rest as arguments for "up"
  LOGS_ARGS := $(wordlist 2,$(words $(MAKECMDGOALS)),$(MAKECMDGOALS))
  # ...and turn them into do-nothing targets
  $(eval $(LOGS_ARGS):;@:)
endif
