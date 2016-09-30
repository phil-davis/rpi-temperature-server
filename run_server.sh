#!/bin/bash

set -e

if [ ! -f "config.py" ]; then
  echo "config.py does not exist in the server directory!"
  echo "creating new one from config.template.py"
  cp server/config.template.py config.py
  echo "please edit config.py to your liking and re-run this script to start the server"
  exit 1
fi

source env/bin/activate
exec python -m server.app "$@"
