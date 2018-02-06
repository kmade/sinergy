FROM kmade/harbor-elm:latest AS base

EXPOSE 8000
# Provides cached layer for node_modules
ADD package.json /tmp/package.json
RUN cd /tmp && yarn && elm-package install -y

RUN mkdir -p /usr/src/app \
  && cp -a /tmp/node_modules /usr/src/app \
  && cp -a /tmp/elm-stuff /usr/src/app

# Define working directory
WORKDIR /usr/src/app
ADD . /usr/src/app
