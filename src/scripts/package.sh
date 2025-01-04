#!/bin/bash
set -e

handle_error() {
    echo "Error occurred in script at line while packing app: ${1}."
    echo "Failed command: ${2}"
    exit 1
}

trap 'handle_error ${LINENO} "${BASH_COMMAND}"' ERR

echo "Building and packaging the app into a zip file"

npm ci --unsafe-perm
npm run build
npm prune --production

mkdir -p ts-express-boilerplate-package/{src,node_modules,config}

cp package.json ts-express-boilerplate-package/
cp -r dist/src/* ts-express-boilerplate-package/src/
cp -r node_modules/* ts-express-boilerplate-package/node_modules/
cp -r config/* ts-express-boilerplate-package/config/

cd ts-express-boilerplate-package

zip -r ../ts-express-boilerplate-package.zip ./*

cd ..

rm -rf dist ts-express-boilerplate-package

echo "Lambda package created at ts-express-boilerplate-package.zip"