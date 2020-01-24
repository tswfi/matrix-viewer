#!/usr/bin/env sh

# abort on errors
set -e

# build
yarn build

# and push
cd dist
git push -f git@github.com:tswfi/matrix-viewer.git master:gh-pages
cd -
