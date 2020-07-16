.DEFAULT_GOAL := help

## GENERAL ##
APP_DIR         = app
FILES_CONFIG    = ""

WORKDIR         ?= ${APP_DIR}
IMAGE_DOCKER	?= node:12-slim
IMAGE_DEV       ?= jjhoncv/node:12-slim

USERID 			?= $(shell id -u)


ifeq ($(ENV), prod)
	NPM_FLAGS = --production
endif

## FUNCTIONS ##

define detect_user
	$(eval WHOAMI := $(shell whoami))
	$(eval USERID := $(shell id -u))
	$(shell echo 'USERNAME:x:USERID:USERID::/app:/sbin/nologin' > $(PWD)/passwd.tmpl)
	$(shell \
		cat $(PWD)/passwd.tmpl | sed 's/USERNAME/$(WHOAMI)/g' \
			| sed 's/USERID/$(USERID)/g' > $(PWD)/passwd)
	$(shell rm -rf $(PWD)/passwd.tmpl)
endef

build.image: ## Construir imagen para development: make build.image
	docker build \
		-f docker/node/Dockerfile \
		--no-cache \
		--build-arg IMAGE=${IMAGE_DOCKER} \
		-t $(IMAGE_DEV) \
		docker/node/ \

npm.install: ## Instalar depedencias npm: make npm.install
	docker run \
		-it \
		--rm \
		--tty=false \
		--network host \
		-u ${USERID}:${USERID} \
		-v ${PWD}/${APP_DIR}:/${WORKDIR} \
		${IMAGE_DEV} \
		npm install ${NPM_FLAGS}

gulp.build: ## Construye site estatico: make gulp.build
	docker run \
		-it \
		--rm \
		--tty=false \
		-u ${USERID}:${USERID} \
		-v ${PWD}/${APP_DIR}:/${WORKDIR} \
		${IMAGE_DEV} \
		npm run build

start: ## Up the docker containers, use me with: make start
	export IMAGE_DEV="$(IMAGE_DEV)" && \
		docker-compose up -d

stop: ## Stop the docker containers, use me with: make stop
	export IMAGE_DEV="$(IMAGE_DEV)" && \
		docker-compose stop

logs: ## View logs docker containers, use me with: make logs
	export IMAGE_DEV="$(IMAGE_DEV)" && \
		docker-compose logs -f

## Target Help ##

help:
	@printf "\033[31m%-22s %-59s %s\033[0m\n" "Target" " Help" "Usage"; \
	printf "\033[31m%-22s %-59s %s\033[0m\n"  "------" " ----" "-----"; \
	grep -hE '^\S+:.*## .*$$' $(MAKEFILE_LIST) | sed -e 's/:.*##\s*/:/' | sort | awk 'BEGIN {FS = ":"}; {printf "\033[32m%-22s\033[0m %-58s \033[34m%s\033[0m\n", $$1, $$2, $$3}'

