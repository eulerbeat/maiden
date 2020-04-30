#!/bin/sh

# Unnecessary in development mode
# python manage.py collectstatic --no-input --clear

# Make and run database migrations
python manage.py makemigrations
python manage.py migrate

# ???
# Be sure to use 0.0.0.0 for the host within the Docker container,
# otherwise the browser won't be able to find it
python manage.py runserver 0.0.0.0:8000

exec "$@"