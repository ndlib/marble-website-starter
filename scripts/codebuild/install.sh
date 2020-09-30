#!/bin/bash
magenta=`tput setaf 5`
reset=`tput sgr0`

echo "${magenta}----- CONFIGURATIONS -------${reset}"
export CHOKIDAR_USEPOLLING=1
echo "DEBUG INFO:"
cat /proc/sys/fs/inotify/max_user_watches
BASE_DIR="${PWD}/"
ENV_FILE="${BASE_DIR}.env"
echo "ENV_FILE: ${ENV_FILE}"

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

echo "${magenta}----- CUSTOMIZATIONS -------${reset}"
pushd scripts/gatsby-source-iiif/
yarn install
node setupEnv.js ${PARAM_CONFIG_PATH} > ${ENV_FILE}

source ${ENV_FILE}

export $(cut -d= -f1 ${ENV_FILE})
./generate.sh ${PARAM_CONFIG_PATH}
popd

echo "Copy .env to site for Gatsby"
cp ./.env ./site/.env.production
