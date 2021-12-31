#!/bin/bash

npx tsc

DOCKER_TAG=${1:-ryanpage/guac-bot}:${2:-latest}

docker build . -t $DOCKER_TAG

if [[ ! -z "${PUSH}" ]]; then
    docker push $DOCKER_TAG
fi