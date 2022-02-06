FROM node:16-alpine AS base

ENV WORKDIR /opt/guac-bot

ENV FONT_LOCATION /usr/share/fonts/truetype

FROM base AS build

RUN apk add --update --no-cache \
    make \
    g++ \
    jpeg-dev \
    cairo-dev \
    giflib-dev \
    pango-dev

WORKDIR /tmp

ENV FONT_LOCATION /usr/share/fonts/truetype

COPY ./asset/font/Roboto ./Roboto

WORKDIR /tmp/Roboto

RUN mkdir -p ${FONT_LOCATION}

RUN install -m644 Roboto-Regular.ttf ${FONT_LOCATION} \
 && install -m644 Roboto-Bold.ttf ${FONT_LOCATION}

RUN mkdir -p ${WORKDIR}

WORKDIR ${WORKDIR}

COPY package.json .

COPY yarn.lock .

RUN yarn install && ls -ltra

COPY node_modules/.prisma node_modules/.prisma

COPY node_modules/prisma node_modules/prisma

COPY node_modules/@prisma node_modules/@prisma

FROM base AS RELEASE

WORKDIR ${WORKDIR}

COPY --from=build ${WORKDIR}/package.json .

COPY --from=build ${WORKDIR}/node_modules ./node_modules

COPY --from=build ${FONT_LOCATION} ${FONT_LOCATION}

COPY ./prisma ./prisma

COPY ./out/minified .

COPY entrypoint.sh ./entrypoint.sh

ENTRYPOINT ["./entrypoint.sh"]