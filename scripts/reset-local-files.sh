#!/bin/bash

SITE=marble
BASE_DIR="${PWD}"
SITE_DIR="${BASE_DIR}/sites/${SITE}"
ENV_FILE="${SITE_DIR}/.env.production"

yarn workspace ${SITE} clean

echo "Deleting: ${SITE_DIR}/content/json/standard/*.json"
rm -rf ${SITE_DIR}/content/json/standard/*.json

cd ./scripts/gatsby-source-iiif
yarn
cd ../..

node ./scripts/gatsby-source-iiif/getStandard.js ${SITE_DIR}
