FROM node:16-alpine

RUN apk add --update --no-cache \
    make \
    g++ \
    jpeg-dev \
    cairo-dev \
    giflib-dev \
    pango-dev

ENV WORKDIR /opt/guac-bot

ENV NODE_ENV production

RUN mkdir -p ${WORKDIR}

WORKDIR ${WORKDIR}

COPY package.json .

COPY yarn.lock .

RUN yarn install

COPY node_modules/.prisma node_modules/.prisma

COPY node_modules/prisma node_modules/prisma

COPY node_modules/@prisma node_modules/@prisma

COPY ./out/minified .

COPY entrypoint.sh ./entrypoint.sh

COPY prisma/schema.prisma prisma/schema.prisma

ENTRYPOINT ["./entrypoint.sh"]