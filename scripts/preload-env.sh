#!/usr/bin/env bash
GRAPHQL_API_KEY_BASE_PATH='/all/stacks/sm-test-maintain-metadata/'
STATIC_SITE_PATH="/all/static-host/marble-website-test/"
FMP_CRED_PATH="/all/filemaker_credentials"

# make sure required packages are installed
pushd ./scripts/environment-configuration
yarn install
popd

# add the config for okta into the env
node ./scripts/environment-configuration/setupEnv.js ${STATIC_SITE_PATH} > './ssm-params.txt' --unhandled-rejections=strict

# add the app sync keys to the env
node ./scripts/environment-configuration/setupEnv.js ${GRAPHQL_API_KEY_BASE_PATH} >> './ssm-params.txt' --unhandled-rejections=strict
source ./ssm-params.txt

rm ./ssm-params.txt
