#!/usr/bin/env bash
set -eu

docker run --rm -d \
    -p 5984:5984 \
    -v $(pwd)../../../configuration/db:/usr/local/etc/couchdb/local.d \
    -v $(pwd)../../../data/db/lib:/usr/local/var/lib/couchdb \
    --name sinergy-db sinergy/db