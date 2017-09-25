FROM kmade/harbor-qa:latest

# install Chrome
RUN apt-get install -y curl
RUN curl -sL https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -
RUN echo 'deb http://dl.google.com/linux/chrome/deb/ stable main' >> /etc/apt/sources.list.d/google.list
RUN apt-get update
RUN apt-get install -y google-chrome-stable
RUN mkdir -p /usr/src/app

ADD package.json /tmp/package.json
RUN cd /tmp && npm install
RUN cp -a /tmp/node_modules /usr/src/app/
ENV NODE_PATH /usr/src/app/node_modules/
ENV PATH /usr/src/app/node_modules/.bin:$PATH
# Define working directory
WORKDIR /usr/src/app
ADD . /usr/src/app

RUN echo '{ "allow_root": true }' > /root/.bowerrc
