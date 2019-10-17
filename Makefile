CLEAN_CONTAINERS = docker container rm -f dnote_redis_1 dnote_backend_1 dnote_frontend_1

add-network:
	docker network create deadlynote_proxy

dev: add-network ## Start dev server
	docker-compose up -d --build

prod: add-network ## Start prod server
	docker-compose -f docker-compose.yml -f docker-compose.production.yml up -d --build

clean-prod:
	$(CLEAN_CONTAINERS) dnote_webserver_1
	docker network rm deadlynote_proxy

clean-dev:
	$(CLEAN_CONTAINERS)
	docker network rm deadlynote_proxy

.PHONY: dev prod

.DEFAULT_GOAL := help
help:
	@grep -E '(^[a-zA-Z_-]+:.*?##.*$$)|(^##)' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[32m%-30s\033[0m %s\n", $$1, $$2}' | sed -e 's/\[32m##/[33m/'
.PHONY: help