FROM node:19-alpine

ARG NODE_AUTH_TOKEN=token

ENV NODE_TLS_REJECT_UNAUTHORIZED=0

WORKDIR /app

RUN apk update && apk add git

COPY .yarn/releases .yarn/releases
COPY .yarn/plugins .yarn/plugins
COPY .yarnrc.yml .yarnrc.yml

RUN yarn init && \
    yarn add @energostalin/pfg-parser@latest

ENTRYPOINT [ "yarn", "exec", "pfg-parser" ]