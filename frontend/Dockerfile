FROM node:8-alpine

ENV DIR=/usr/src/frontend

COPY package.json ./

RUN npm i && \
    mkdir -p $DIR && \
    cp -R ./node_modules .$DIR

WORKDIR $DIR

COPY . $DIR
