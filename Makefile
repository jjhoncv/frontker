.DEFAULT_GOAL := help

image:
	docker build -t jjhoncv/node:9.11.1 docker/node

run:
	docker run -it --rm -u $$(id -u):$$(id -g) $(PORT) -v $(PWD):/app -w /app/frontend jjhoncv/node:9.11.1 $(NODE_COMMAND)

install:
	@make run \
	NODE_COMMAND='yarn'

watch:
	@make run \
	NODE_COMMAND='yarn watch' \
	PORT='-p 3000:3000'

build:
	@make run \
	NODE_COMMAND='yarn build $(TASK)'

help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-16s\033[0m %s\n", $$1, $$2}'
