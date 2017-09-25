FROM kmade/harbor-node:latest


RUN npm i -g eslint \
    --loglevel error --unsafe-perm
# RUN mkdir -p /usr/local/node_modules

# ADD package.json /tmp/package.json
# RUN cd /tmp && npm i --loglevel error --unsafe-perm
# RUN cp -a /tmp/node_modules /usr/local/

# ENV NODE_PATH /usr/local/node_modules
# ENV PATH /usr/local/node_modules.bin:$PATH

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app
ADD . /usr/src/app