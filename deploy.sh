#!/usr/bin/env sh

# abort on errors
set -e

# build
yarn build

# and push
cd dist
git init
git add -A
git commit -m "deploy"
git push -f git@github.com:tswfi/matrix-viewer.git master:gh-pages
cd -
