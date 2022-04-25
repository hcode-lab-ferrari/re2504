FROM node:16 AS builder

WORKDIR /usr/src/api

COPY . .

RUN npm install --quiet --no-optional --no-fund --loglevel=error

EXPOSE 3000