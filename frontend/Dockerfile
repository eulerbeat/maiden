# Use an official node runtime as a parent image
FROM node:10-alpine

RUN apk update && apk upgrade && apk add --no-cache bash git openssh yarn

WORKDIR /app/

# Install dependencies
COPY package.json /app/

RUN yarn install

# Add rest of the client code
COPY . /app/

EXPOSE 3000

CMD yarn start
