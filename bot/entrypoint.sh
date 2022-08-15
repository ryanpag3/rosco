#!/bin/sh

npx prisma migrate deploy


if [ "$IS_API" == "true" ]; then
  node src/api/index.js
else
  node src/index.js
fi