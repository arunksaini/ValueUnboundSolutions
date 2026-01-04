#!/usr/bin/env sh

# abort on errors
set -e

# clean and build
rm -rf dist
npm run build

# navigate into the build output directory
cd dist

# place .nojekyll to bypass Jekyll processing
echo > .nojekyll

git init
git config http.postBuffer 524288000
git checkout -b gh-pages
git add -A
git commit -m 'deploy'

# deploying to https://<USERNAME>.github.io/<REPO>
git push -f https://github.com/arunksaini/ValueUnboundSolutions.git gh-pages:gh-pages

cd -
