#!/bin/bash

npx prisma migrate deploy

node src/index.js