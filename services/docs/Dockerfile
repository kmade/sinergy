FROM mhart/alpine-node:8.3

EXPOSE 4444

RUN yarn add global hexo-cli

RUN mkdir -p /usr/src/app

# Provides cached layer for node_modules
ADD package.json /tmp/package.json
RUN cd /tmp && yarn
RUN cp -a /tmp/node_modules /usr/src/app/

# Define working directory
WORKDIR /usr/src/app
ADD . /usr/src/app