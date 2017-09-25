#!/usr/bin/env bash
set -eu

docker run --rm -d \
    -v $(pwd)/:/usr/src/app \
    -v /usr/src/app/node_modules \
    --name sinergy-qa sinergy/qa wct --help
