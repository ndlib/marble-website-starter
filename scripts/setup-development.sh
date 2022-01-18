#!/usr/bin/env bash
SITE=$1
if [ -z "$1" ]
then
  echo "Usage: ./scripts/setup-development.sh <site>"
  exit 1
fi

BASE_DIR="${PWD}"
SITE_DIR="${BASE_DIR}/sites/${SITE}"
ENV_FILE="${SITE_DIR}/.env.development"
EXAMPLE_FILE="${SITE_DIR}/.env.development.example"

cp ${EXAMPLE_FILE} ${ENV_FILE}

GRAPHQL_API_KEY_KEY_PATH_BASE_PATH='/all/stacks/sm-test-maintain-metadata/'
#export FMP_CRED_PATH="/all/filemaker_credentials"

# add the app sync keys to the env
node ./scripts/environment-configuration/setupEnv.js ${GRAPHQL_API_KEY_KEY_PATH_BASE_PATH} >> ${ENV_FILE} --unhandled-rejections=strict

yarn workspace $SITE install

echo "Reset .env.development and double check your keys."
