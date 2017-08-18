#!/bin/bash
set -eu
docker build -t sinergy/ui . $@
