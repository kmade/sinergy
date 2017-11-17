FROM kmade/harbor-polymer:latest AS base

EXPOSE 8081 9081

# Provides cached layer for node_modules
ADD package.json /tmp/package.json
RUN cd /tmp && yarn --flat --prod --non-interactive
RUN mkdir -p /usr/src/app \
  && cp -a /tmp/node_modules /usr/src/app/

#COPY --from=base /usr/src/app/bower_components .

# Define working directory
WORKDIR /usr/src/app

RUN echo '{ "allow_root": true }' > $HOME/.bowerrc
ADD bower.json /usr/src/app/bower.json
RUN bower install --silent
ADD . /usr/src/app


