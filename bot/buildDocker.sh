#!/bin/bash

npx tsc

docker build . -t ${1:-ryanpage/guac-bot}:${2:-latest}

