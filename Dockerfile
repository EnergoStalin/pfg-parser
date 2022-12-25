FROM node:latest

ARG NODE_AUTH_TOKEN=token

WORKDIR /app

COPY .yarn/releases .yarn/releases
COPY .yarn/plugins .yarn/plugins
COPY .yarnrc.yml .yarnrc.yml

RUN yarn init && \
    yarn add @energostalin/pfg-parser@latest

ENTRYPOINT [ "yarn", "exec", "pfg-parser" ]