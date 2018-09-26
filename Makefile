.DEFAULT_GOAL := help

detect-user:
	$(eval WHOAMI := $$(shell whoami))
	$(eval USERID := $$(shell id -u))
	echo 'USERNAME:x:USERID:USERID::/app:/sbin/nologin' > passwd
	sed -i 's/USERNAME/$(WHOAMI)/g' passwd
	sed -i 's/USERID/$(USERID)/g' passwd

remove:
	@rm -fr .v8flags.* .npm .config .cache .yarn .yarnrc passwd frontend/yarn-error.log

image:
	docker build -t jjhoncv/node:9.11.1 .

run-node: detect-user
	docker run -it --rm $(PORT) -u $(USERID):$(USERID) -v $(PWD)/passwd:/etc/passwd:ro -v $(PWD):/app -w /app/frontend jjhoncv/node:9.11.1 sh -c '$(NODE_COMMAND)'

install:
	@make run-node \
	NODE_COMMAND='yarn'
	@make remove

watch:
	@make run-node \
	NODE_COMMAND='yarn watch' \
	PORT='-p 3000:3000'
	@make remove

build:
	@make run-node \
	NODE_COMMAND='yarn build $(TASK)'
	@make remove

help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-16s\033[0m %s\n", $$1, $$2}'
