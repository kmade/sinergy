ARG node_version
ARG nodemon_version
# ---- Base Node ----
FROM node:$node_version AS base

# set our node environment, either development or production
# defaults to production, compose overrides this to development on build and run
ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

EXPOSE 3000
EXPOSE 5858

RUN echo "Installing nodemon@$nodemon_version"
RUN npm i -g nodemon@$nodemon_version --loglevel error

RUN mkdir -p /usr/src/app

# fake central dependency links, so that the links have a connecting central link across containers
# do this for each shared module
# RUN mkdir -p /usr/lib/node_modules/@sinergy && ln -s /packages/@sinergy /usr/lib/node_modules/@sinergy
# Provides cached layer for node_modules
ADD package.json /tmp/package.json
RUN cd /tmp && npm install --loglevel error && npm cache clean --force
RUN cp -a /tmp/node_modules /usr/src/app/

ENV PATH /usr/src/app/node_modules/.bin:$PATH
# Define working directory
WORKDIR /usr/src/app
ADD . /usr/src/app

CMD [ "node", "bin/server.js"]
