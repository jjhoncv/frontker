.DEFAULT_GOAL := help

detect-user:
	$(eval WHOAMI := $(shell whoami))
	$(eval USERID := $(shell id -u))
	echo 'USERNAME:x:USERID:USERID::/app:/sbin/nologin' > passwd
	sed -i 's/USERNAME/$(WHOAMI)/g' passwd
	sed -i 's/USERID/$(USERID)/g' passwd

install: detect-user
	docker run -it --rm -u $(USERID):$(USERID) -v $(PWD)/passwd:/etc/passwd:ro -v $(PWD):/app -w /app/frontend node:10.10.0-slim yarn

build: detect-user
	docker run -it --rm -u $(USERID):$(USERID) -v $(PWD)/passwd:/etc/passwd:ro -v $(PWD):/app -w /app/frontend node:10.10.0-slim yarn start 

help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-16s\033[0m %s\n", $$1, $$2}'
