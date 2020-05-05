# Docker, <Django + React>, <Ngnix + Postgres>


Dockerized boilerplate. Ngnix server + PostgreSQL database + Django / DRF API backend + React frontend.  
Inspired by [this](https://dev.to/englishcraig/creating-an-app-with-docker-compose-django-and-create-react-app-31lf) and [that](https://testdriven.io/blog/dockerizing-django-with-postgres-gunicorn-and-nginx/).

During development, used SQLite + Django + React. In deployment, used Ngnix + PostgreSQL + Django.

Backend used:
- [Django](https://www.djangoproject.com/) 3.0
- [django-rest-framework](https://www.django-rest-framework.org/) for REST APIs 
- [django-rest-framework-simplejwt](https://django-rest-framework-simplejwt.readthedocs.io/en/latest/) for authentication


Frontend used:
- [React](https://reactjs.org/) 16.13.1
- [Redux](https://redux.js.org/) with [Redux-Saga](https://redux-saga.js.org/) for state management
- [axios](https://github.com/axios/axios) for HTTP client
- [MATERIAL-UI](https://material-ui.com/) for UI
- [FORMIK](https://jaredpalmer.com/formik) for the Login form
- [Enzyme](https://enzymejs.github.io/enzyme/) for testing



## Prerequisites

### Docker

1. Docker
1. docker-compose



## Installation

### Development

- `docker-compose up` will build the image and run the container.
- After running, you can see frontend at http://127.0.0.1:3000/ and backend at http://127.0.0.1:8000/.  
(Django built-in admin page at http://127.0.0.1:8000/api/admin/)
- If you want to add a new npm package to the frontend, use `docker-compose exec frontend yarn add ...` or run `./frontend/fexec.sh yarn add ...`.  
([fexec.sh](./frontend/fexec.sh) is just a wrapper for the former)
- Similarly, if you want to add a new python package to the backend, use `docker-compose exec backend pip install ...` or run `./backend/bexec.sh pip install ...`.   
Save dependencies in [requirements.txt](./backend/requirements.txt). `pip` doesn't care about [requirements.txt](./backend/requirements.txt) so you have to add dependency manually in the file.

  *You can have a dedicated shell by running `docker-compose exec service_name sh`.*

- After you've added/modified models in the backend, you need to run database migration.
  `docker-compose exec backend python manage.py makemigrations` and `docker-compose exec backend python manage.py migrate` will compile migrations and migrate.
  Instead, you can run `docker-compose up --no-deps --build backend` to rebuild `backend` image since it automatically runs migrations during the build. 


### Deployment

- `./build_front.sh` will build React frontend and put files into `./backend/front_build` directory. This should take a while.
- `docker-compose -f docker-compose.prod.yml up` will build the image and run the container.
  While building, collecting Django static files, migrating PostgreSQL database, and configuring nginx server is done behind the scenes.
- If it's successful, you can see the nginx server running at http://localhost. Django backend is served by [gunicorn](https://gunicorn.org/) and configured as a reverse proxy in [nginx configuration](./nginx/nginx.conf).
- Django built-in admin page is at http://localhost/api/auth and you can log in with email: `dev@test.com`, password: `devPass1!`.    
This user is a superadmin and created automatically during the build of the docker image.
- See [.env.prod](./.env.prod) for production environment variables.



Made with ❤️ in Docker.
