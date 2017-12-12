#!/bin/sh
set -eu

host="$1"
shift
cmd="$@"
export RABBITMQ_NODENAME="${RABBITMQ_NODENAME:-"rabbit@$host"}"
echo "Bus station"

while ! nc -z 172.28.1.3 5672; do sleep 3; done
until rabbitmqctl status; do
  >&2 echo "Bus is not here - waiting"
  sleep 1
done

>&2 echo "Bus is here - executing command"
exec $cmd
