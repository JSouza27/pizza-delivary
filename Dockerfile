FROM node:16.10-alpine3.14

RUN apk add --no-cache bash

RUN yarn global add @nestjs/cli@7.5.6

USER node

WORKDIR /home/node/app
