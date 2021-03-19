PROJECT_NAME=hackernews

start:
	@docker stop resurface
	@docker build -t test-express-hackernews --no-cache .
	@docker-compose up --detach

stop:
	@docker-compose stop
	@docker-compose down --volumes
	@docker image rmi -f test-express-hackernews:latest

bash:
	@docker exec -it hackernews bash

logs:
	@docker logs -f hackernews

ping:
	@echo curl "http://localhost/ping"
	@curl "http://localhost/ping"

restart:
	@docker-compose stop
	@docker-compose up
