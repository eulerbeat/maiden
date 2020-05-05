#!/bin/bash

cd "$(dirname "$0")"

echo "starting container ..."
docker-compose up -d

echo "building ..."
docker-compose exec frontend yarn build

echo "removing old artifacts ..."
rm -r -f ./backend/front_build

echo "copying new artifacts ..."
cp -r -f  ./frontend/build ./backend/front_build

echo "finished!"
