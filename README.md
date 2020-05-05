# Docker, <Django + React>, <Ngnix + Postgres>


Dockerized boilerplate. Ngnix server + PostgreSQL database + Django / DRF API backend + React frontend.  
Inspired by [this](https://dev.to/englishcraig/creating-an-app-with-docker-compose-django-and-create-react-app-31lf) and [that](https://testdriven.io/blog/dockerizing-django-with-postgres-gunicorn-and-nginx/).

During development, used SQLite + Django + React. In deployment, used Ngnix + PostgreSQL + Django.


## Prerequisites

### Docker

1. Docker
1. docker-compose


## Installation

### Development

- `docker-compose up` will build the image and run the container.
- After running, you can see frontend at http://127.0.0.1:3000/ and backend at http://127.0.0.1:8000/. (Django built-in admin page at http://127.0.0.1:8000/api/admin/)
- If you want to add a new npm package to the frontend, use `docker-compose exec frontend yarn add ...` or run `./fexec.sh yarn add ...` in `frontend` directory. (`./frontend/fexec.sh` is just a wrapper for the former)
- Similarly, if you want to add a new python package to the backend, use `docker-compose exec backend pip install ...` or run `./bexec.sh pip install ...` in `backend` directory. `pip` doesn't care about `requirements.txt` so you have to add dependency manually in the file.

*You can have a dedicated shell by running `docker-compose exec service_name sh`.*

- After you've added/modified models, you need to run database migration.
  `docker-compose exec backend python manage.py makemigrations` and `docker-compose exec backend python manage.py migrate` will compile migrations and migrate.
  Instead, you can run `docker-compose up --no-deps --build backend` to rebuild `backend` image since it automatically runs migrations during the build. 


### Deployment

- `./build_front.sh` will build React frontend and put files into `./backend/front_build` directory.
- `docker-compose -f docker-compose.prod.yml up` will build the image and run the container.
  While building, collecting Django static files, migrating PostgreSQL database, and configuring nginx server is done behind the scenes.
- If it's successful, you can see the nginx server running at http://localhost. Django backend is served by [`gunicorn`](https://gunicorn.org/) and configured as a reverse proxy in [nginx configuration](./nginx/nginx.conf).
- Django built-in admin page is at http://localhost/api/auth and you can log in with email: `dev@test.com`, password: `devPass1!`. This user is a superadmin and created automatically during the build of the docker image.



Thanks for reading!
