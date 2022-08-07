### STAGE 1: Build ###

FROM node:14-slim as builder

RUN npm i -g angular-build-info

ENV SRC_HOME /usr/src/webhookie-portal

RUN mkdir -p $SRC_HOME
WORKDIR $SRC_HOME

ENV PATH $SRC_HOME/node_modules/.bin:$PATH

COPY package*.json ./

RUN npm install
RUN npm rebuild node-sass

COPY . $SRC_HOME

RUN npm run build


### STAGE 2: Setup ###
FROM nginx:1.21-alpine

EXPOSE 80

RUN apk update
RUN apk upgrade
RUN apk add bash

COPY ./docker/branding.sh /docker-entrypoint.d/branding.sh
RUN chmod +x /docker-entrypoint.d/branding.sh

RUN rm -rf /usr/share/nginx/html
COPY ./docker/nginx-default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /usr/src/webhookie-portal/dist/webhookie-portal /usr/share/nginx/html

#USER nginx

CMD ["nginx", "-g", "daemon off;"]





