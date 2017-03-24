FROM node:6-alpine

RUN mkdir -p /twitter-clone-3

ADD ./package.json /twitter-clone-3/package.json

WORKDIR /twitter-clone-3/
RUN npm install --production -q

ADD ./ /twitter-clone-3/
