#!/bin/bash
magenta=`tput setaf 5`
reset=`tput sgr0`

echo "${magenta}----- SYSTEM -------${reset}"
export CHOKIDAR_USEPOLLING=1
echo "FILE WATCHER DEBUG INFO:"
cat /proc/sys/fs/inotify/max_user_watches
sysctl -w fs.inotify.max_user_watches=524288
cat /proc/sys/fs/inotify/max_user_watches

echo "Manually updating to Node 18"
n 18
node --version

echo "${magenta}----- CONFIGURATIONS -------${reset}"
BASE_DIR="${PWD}"
if [[ -z "$SITE_DIRECTORY" ]]; then
    SITE_DIRECTORY="sites/marble"
fi
SITE_DIR="${BASE_DIR}/${SITE_DIRECTORY}"
if [[ -z "$WORKSPACE_NAME" ]]; then
    WORKSPACE_NAME="marble"
fi
if [[ -z "$S3_DEST_BUCKET" ]]; then
    S3_DEST_BUCKET="marbleb-prod-website-sitebucket397a1860-1ny38m2va9ueb"
fi

# ENV_FILE="${SITE_DIR}/.env.production"

# move submodule into place
if [[ ! -z "${SUBMOD_DIR}" ]]; then
  mv ${SUBMOD_DIR}/* ${SITE_DIR}
  # mv ${SUBMOD_DIR}/.env.production ${SITE_DIR}
  # mv ${SUBMOD_DIR}/.env.production-test ${SITE_DIR}
fi

# AWS parameter store key path(ex: /all/static-host/<stackname>/)
# must contain search_url and search_index key/values
# pass in 'local' for dev settings
export PARAM_CONFIG_PATH=${PARAM_CONFIG_PATH:=$1}
if [[ -z "$PARAM_CONFIG_PATH" ]]; then
    echo "FATAL: Elasticsearch configuration required"
    echo "export PARAM_CONFIG_PATH=/all/static-host/<stackname>/"
    exit 2
fi

# if [ $BUILD_ENVIRONMENT == "test" ]; then
#   echo "Setting up Production Test Env"
#   cp ${SITE_DIR}/.env.production-test ${SITE_DIR}/.env.production
# fi

echo "${magenta}----- INSTALLATIONS -------${reset}"
# install yarn
npm install -g yarn || { echo "Npm install failed" ;exit 1; }

# install gatsby
yarn global add gatsby-cli || { echo "FATAL: Could not install Gatsby Command Line Tools";exit 1; }

# set yarn as default package manager for gatsby
mkdir ~/.config/gatsby
cp ./scripts/codebuild/config.json ~/.config/gatsby/

# install app dependencies
yarn install || { echo "yarn install failed" ;exit 1; }

pushd scripts/environment-configuration/
  yarn install

  echo "${magenta}----- Build ENV Config -------${reset}"

  # put the env sourced vars in the environment file.
  echo "S3_DEST_BUCKET='${S3_DEST_BUCKET}'" >> $ENV_FILE
  echo "GRAPHQL_KEY_BASE='${GRAPHQL_KEY_BASE}'" >> $ENV_FILE
  # echo "SEARCH_URL='${SEARCH_URL}'" >> $ENV_FILE

  # add the app sync keys to the env
  # export FMP_CRED_PATH="/all/filemaker_credentials"
  # node setupEnv.js ${GRAPHQL_KEY_BASE} >> ${ENV_FILE} --unhandled-rejections=strict

  echo "TEST"
  echo "GRAPHQL_API_URL='${GRAPHQL_API_URL}'"
  echo
popd

cat ${ENV_FILE}

echo "${magenta}----- Unit Tests -------${reset}"
failures=0
trap 'failures=$((failures+1))' ERR

yarn workspace @ndlib/gatsby-theme-marble test
yarn workspace @ndlib/gatsby-source-appsync-marble test
yarn workspace ${WORKSPACE_NAME} test

if ((failures != 0)); then
  echo "${magenta}TESTS FAILED${reset}"
  exit 1
fi

echo "${magenta}----- Build -------${reset}"
NODE_OPTIONS="--max-old-space-size=8192" yarn workspace ${WORKSPACE_NAME} build


echo "${magenta}----- Deploy -------${reset}"
yarn workspace ${WORKSPACE_NAME} deploy
