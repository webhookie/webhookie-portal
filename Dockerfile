### STAGE 1: Build ###

FROM node:14-slim as builder

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

COPY ./docker/hex2rgb.sh /docker-entrypoint.d/hex2rgb.sh
COPY ./docker/page-title.sh /docker-entrypoint.d/page-title.sh
RUN chmod +x /docker-entrypoint.d/page-title.sh
RUN chmod +x /docker-entrypoint.d/hex2rgb.sh

RUN rm -rf /usr/share/nginx/html
COPY ./docker/nginx-default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /usr/src/webhookie-portal/dist/webhookie-portal /usr/share/nginx/html

#branding
COPY --from=builder /usr/src/webhookie-portal/dist/webhookie-portal/assets/branding /var/data/webhookie/branding
RUN rm -rf /usr/share/nginx/html/assets/branding
RUN ln -s /var/data/webhookie/branding /usr/share/nginx/html/assets/branding

#favicon
COPY --from=builder /usr/src/webhookie-portal/dist/webhookie-portal/favicon.ico /var/data/webhookie/branding
RUN rm -rf /usr/share/nginx/html/favicon.ico
RUN ln -s /var/data/webhookie/branding/favicon.ico /usr/share/nginx/html/favicon.ico

#USER nginx

CMD ["nginx", "-g", "daemon off;"]





