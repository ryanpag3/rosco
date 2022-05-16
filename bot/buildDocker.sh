#!/bin/bash

rm -rf ./out

echo "compiling project"
npx tsc 

echo "generating schema"
npx prisma generate

echo "minifying"
cd out && \
 rm -rf **/*.min.js && \
 npx uglifyjs-folder . -x .js -eo minified && \
 cd -

DOCKER_TAG=${1:-ryanpage/rosco}:${2:-latest}

pwd

echo "building image"
docker build . -t $DOCKER_TAG --progress=plain

if [[ ! -z "${PUSH}" ]]; then
    docker push $DOCKER_TAG
fi