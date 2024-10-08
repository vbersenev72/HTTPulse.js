#!/usr/bin/env bash

clear
echo "🛠️ Building..."

rm -rf dist || true
rm -rf types || true

npx tsc &&
  echo "✔️ Built!"
