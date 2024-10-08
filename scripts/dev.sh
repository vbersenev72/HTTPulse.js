#!/usr/bin/env bash

echo "♨️ Running in development mode..."

npx tsc -w &
npx node --watch-path=dist dist/index.js
