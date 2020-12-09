#!/bin/bash

SITE=site
BASE_DIR="${PWD}"
SITE_DIR="${BASE_DIR}/${SITE}"
ENV_FILE="${SITE_DIR}/.env.production"

yarn workspace ${SITE} clean

echo "Deleting: ${SITE_DIR}/content/json/nd/*.json"
rm -rf ${SITE_DIR}/content/json/nd/*.json

node ./scripts/gatsby-source-iiif/getStandard.js ${SITE_DIR}
