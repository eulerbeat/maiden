#!/bin/sh

# Collect static files
python manage.py collectstatic --no-input --clear

# Wait for the database servewr
if [ "$DATABASE" = "postgres" ]
then
    echo "Waiting for postgres..."

    while ! nc -z $SQL_HOST $SQL_PORT; do
      sleep 0.1
    done

    echo "PostgreSQL started"
fi

# Make and run database migrations
python manage.py makemigrations
python manage.py migrate

exec "$@"