#!/usr/bin/env bash
set -eu
APP=$1
APP_PATH="./services/$APP"

echo "Starting $APP"
NODE_ENV="development" npm run start:electron --log-level --prefix $APP_PATH
