FROM node:latest

ARG NODE_AUTH_TOKEN=token

ENV NODE_TLS_REJECT_UNAUTHORIZED=0

WORKDIR /app

COPY .yarn/releases .yarn/releases
COPY .yarn/plugins .yarn/plugins
COPY .yarnrc.yml .yarnrc.yml

RUN yarn init && \
    yarn add @energostalin/pfg-parser@latest

ENTRYPOINT [ "yarn", "exec", "pfg-parser" ]