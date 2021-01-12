#!/bin/bash
magenta=`tput setaf 5`
reset=`tput sgr0`

echo "${magenta}----- SYSTEM -------${reset}"
export CHOKIDAR_USEPOLLING=1
echo "FILE WATCHER DEBUG INFO:"
cat /proc/sys/fs/inotify/max_user_watches
sysctl -w fs.inotify.max_user_watches=524288
cat /proc/sys/fs/inotify/max_user_watches


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

ENV_FILE="${SITE_DIR}/.env.production"

# move submodule into place
if [[ ! -z "${SUBMOD_DIR}" ]]; then
  mv ${SUBMOD_DIR}/* ${SITE_DIR}
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

pushd scripts/gatsby-source-iiif/
  yarn install
  echo "${magenta}----- Build ENV Config -------${reset}"
  node setupEnv.js ${PARAM_CONFIG_PATH} > ${ENV_FILE} --unhandled-rejections=strict

  echo "${magenta}----- Get Metadata -------${reset}"
  node getStandard.js ${ENV_FILE} || { echo "Unable to load item metadata" ;exit 1; }

  echo "${magenta}----- Index -------${reset}"
  node indexSearch.js ${ENV_FILE} || { echo "Unable to send data to site index" ;exit 1; }
popd

echo "${magenta}----- Unit Tests -------${reset}"
failures=0
trap 'failures=$((failures+1))' ERR

yarn workspace @ndlib/gatsby-theme-marble test
yarn workspace ${WORKSPACE_NAME} test

if ((failures != 0)); then
  echo "${magenta}TESTS FAILED${reset}"
  exit 1
fi

echo "${magenta}----- Build -------${reset}"
yarn workspace ${WORKSPACE_NAME} build


echo "${magenta}----- Deploy -------${reset}"
yarn workspace ${WORKSPACE_NAME} deploy
