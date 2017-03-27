FROM node:6-alpine

RUN mkdir -p /backend

ADD ./package.json /backend/package.json

WORKDIR /backend/
RUN npm install --production -q

ADD ./ /backend/
