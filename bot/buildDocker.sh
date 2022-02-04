#!/bin/bash

yarn migrate deploy

rm -rf ./out

npx tsc 

cd out && \
 rm -rf **/*.min.js && \
 npx uglifyjs-folder . -x .js -eo minified && \
 cd -

DOCKER_TAG=${1:-ryanpage/guac-bot}:${2:-latest}


pwd


docker build . -t $DOCKER_TAG

if [[ ! -z "${PUSH}" ]]; then
    docker push $DOCKER_TAG
fi