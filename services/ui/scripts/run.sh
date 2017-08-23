#!/bin/bash
set -eu

docker run -d --rm \
  -v $(pwd):/usr/src/app \
  -v /usr/src/app/node_modules \
  -p 8081:8081 \
  -p 8000:8000 \
  --name sinergy-ui \
  sinergy/ui \
  yarn start:dev


