#!/usr/bin/env bash
set -eu

APP_PATH="./services/polytron"

#cd $APP_PATH
npm run start:electron --log-level --prefix $APP_PATH
