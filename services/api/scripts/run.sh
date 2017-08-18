#!/usr/bin/env bash
set -eu

docker run --rm -d \
    -v $(pwd)/:/usr/src/app \
    -v /usr/src/app/node_modules \
    -p 4000:4000 \
    -p 5858:5858 \
    --name sinergy-api sinergy/api yarn start:dev