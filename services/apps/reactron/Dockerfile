ARG node_version
# ---- Base Node ----
FROM node:$node_version AS base

EXPOSE 8080 9080

# Provides cached layer for node_modules
ADD package.json /tmp/package.json
RUN cd /tmp && npm install --production --loglevel error

RUN mkdir -p /usr/src/app \
  && cp -a /tmp/node_modules /usr/src/app/

# Define working directory
WORKDIR /usr/src/app


#RUN bower install
ADD . /usr/src/app


