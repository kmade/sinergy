FROM mhart/alpine-node:8.3

EXPOSE 4000
EXPOSE 5858

RUN apk add --update \
    python \
    python-dev \
    py-pip \
    build-base \
  && pip install virtualenv \
  && rm -rf /var/cache/apk/*

RUN npm i -g nodemon --loglevel error

RUN mkdir -p /usr/src/app

# fake central dependency links, so that the links have a connecting central link across containers
# do this for each shared module
# RUN mkdir -p /usr/lib/node_modules/@sinergy && ln -s /packages/@sinergy /usr/lib/node_modules/@sinergy
# Provides cached layer for node_modules
ADD package.json /tmp/package.json
RUN cd /tmp && yarn
RUN cp -a /tmp/node_modules /usr/src/app/

# Define working directory
WORKDIR /usr/src/app
ADD . /usr/src/app

