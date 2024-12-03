#!/usr/bin/env bash

# Verwendung: ./wait-for-it.sh host:port [-t timeout] [-- command args]
# Beispiel: ./wait-for-it.sh db:5432 -t 30 -- echo "Datenbank ist bereit!"

TIMEOUT=15
QUIET=0

echoerr() { if [[ $QUIET -ne 1 ]]; then echo "$@" 1>&2; fi }

usage()
{
  echo "Usage: $0 host:port [-t timeout] [-- command args]"
  exit 1
}

wait_for()
{
  if [[ $TIMEOUT -gt 0 ]]; then
    echoerr "$0: waiting $TIMEOUT seconds for $HOST:$PORT"
  else
    echoerr "$0: waiting for $HOST:$PORT without a timeout"
  fi
  start_ts=$(date +%s)
  while :
  do
    if [[ $TIMEOUT -gt 0 ]]; then
      current_ts=$(date +%s)
      elapsed=$((current_ts - start_ts))
      if [[ $elapsed -ge $TIMEOUT ]]; then
        echoerr "$0: timeout occurred after waiting $TIMEOUT seconds for $HOST:$PORT"
        exit 1
      fi
    fi
    (echo > /dev/tcp/$HOST/$PORT) >/dev/null 2>&1
    result=$?
    if [[ $result -eq 0 ]]; then
      break
    fi
    sleep 1
  done
  echoerr "$0: $HOST:$PORT is available after $elapsed seconds"
}

wait_for_wrapper()
{
  if [[ "$HOST" == "" || "$PORT" == "" ]]; then
    echoerr "Error: you need to provide a host and port to test."
    usage
  fi
  wait_for
}

# Parse arguments
while [[ $# -gt 0 ]]
do
  case "$1" in
    *:* )
    HOST=$(echo $1 | cut -d : -f 1)
    PORT=$(echo $1 | cut -d : -f 2)
    shift 1
    ;;
    -q | --quiet)
    QUIET=1
    shift 1
    ;;
    -t)
    TIMEOUT="$2"
    if [[ $TIMEOUT == "" ]]; then break; fi
    shift 2
    ;;
    --)
    shift
    CLI="$@"
    break
    ;;
    -*)
    echoerr "Unknown option: $1"
    usage
    ;;
    *)
    usage
    ;;
  esac
done

wait_for_wrapper

if [[ "$CLI" != "" ]]; then
  exec $CLI
else
  exit 0
fi
