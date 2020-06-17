# Hackathon base project

This project is here to help you get started quickly on developing a new project. To get started simply run `./init` in the project root. This script will allow you to pick from supported project templates and optionally provide a remote repo url to push the newly initialized project to.

From there simply call `docker-compose up` to start all base components.

By default every project has a frontend, backend, and MySQL server. The MySQL database can be seeded with DDL/DML by placing `.sql` files in the `sql` folder. These scripts will only run when the container is created. You can force the recreation of the container by:
1. Stopping your services (Ctrl-C)
2. Running `docker rm $(basename $(pwd))_mysql_1` in the project root 
3. Running `docker-compose up`

Repos that are pulled in when initializing

Backend:
https://github.com/RedVentures/hackathon-node-base
https://github.com/RedVentures/hackathon-go-base

Frontend:
https://github.com/RedVentures/hackathon-react-base
https://github.com/RedVentures/hackathon-vue-base