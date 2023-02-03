FROM node:19-alpine as build

ARG NODE_AUTH_TOKEN=token

WORKDIR /app
RUN apk update && apk add git

COPY .yarn/releases .yarn/releases
COPY .yarn/plugins .yarn/plugins
COPY .yarnrc.yml .yarnrc.yml

RUN yarn init && \
    yarn add @energostalin/pfg-parser@latest

FROM node:19-alpine as rutime
ENV NODE_TLS_REJECT_UNAUTHORIZED=0

WORKDIR /app
COPY --from=build /app .

ENTRYPOINT [ "yarn", "exec", "pfg-parser" ]