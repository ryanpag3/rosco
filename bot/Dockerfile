FROM node:16

ENV WORKDIR /opt/guac-bot

RUN mkdir -p ${WORKDIR}

WORKDIR ${WORKDIR}

COPY package.json .

COPY yarn.lock .

RUN yarn install

COPY ./out ./out

ENTRYPOINT ["node", "out/index.js"]