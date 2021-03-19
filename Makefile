PROJECT_NAME=express

start:
	@docker stop resurface
	@docker build -t test-express --no-cache .
	@docker-compose up --detach

stop:
	@docker-compose stop
	@docker-compose down --volumes
	@docker image rmi -f test-express:latest

bash:
	@docker exec -it express bash

logs:
	@docker logs -f express

ping:
	@curl "http://localhost/ping"
