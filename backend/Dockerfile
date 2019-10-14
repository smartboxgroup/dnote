FROM node:8-alpine

ENV DIR=/usr/src/api

COPY package.json package-lock.json ./

RUN apk add python make

RUN npm i && \
    mkdir -p $DIR && \
    cp -R ./node_modules .$DIR

WORKDIR $DIR

COPY . $DIR
