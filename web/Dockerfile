FROM node:latest as build

WORKDIR /opt/rosco/web

COPY package.json .

RUN yarn install

COPY . .

RUN yarn build

FROM nginx:stable-alpine

RUN apk update && apk add bash

COPY --from=build /opt/rosco/web/build /usr/share/nginx/html

COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["/bin/sh", "-c", "cd /usr/share/nginx/html/ && nginx -g \"daemon off;\""]