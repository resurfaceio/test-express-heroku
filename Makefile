PROJECT_NAME=express

start:
	@docker stop resurface || true
	@docker build -t test-express --no-cache .
	@docker-compose up --detach

stop:
	@docker-compose stop
	@docker-compose down --volumes
	@docker image rmi -f test-express

bash:
	@docker exec -it express bash

logs:
	@docker logs -f express

ping:
	@curl "http://localhost/ping"

restart:
	@docker-compose stop
	@docker-compose up --detach
