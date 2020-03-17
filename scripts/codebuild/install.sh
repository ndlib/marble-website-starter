#!/bin/bash
magenta=`tput setaf 5`
reset=`tput sgr0`

echo "${magenta}----- CONFIGURATIONS -------${reset}"
BASE_DIR="${PWD}/"
ENV_FILE="${BASE_DIR}.env"
echo "ENV_FILE: ${ENV_FILE}"

# AWS parameter store key path(ex: /all/static-host/<stackname>/)
# must contain search_url and search_index key/values
# pass in 'local' for dev settings
if [[ $# -ne 1 ]]; then
    echo "FATAL: Elasticsearch configuration required"
    echo "scripts/codebuild/install.sh /all/static-host/<stackname>/"
    exit 2
fi

echo "${magenta}----- INSTALLATIONS -------${reset}"
# install yarn
npm install -g yarn || { echo "Npm install failed" ;exit 1; }

# install gatsby
yarn global add gatsby-cli || { echo "FATAL: Could not install Gatsby Command Line Tools";exit 1; }

# install app dependencies
yarn install || { echo "yarn install failed" ;exit 1; }

echo "${magenta}----- CUSTOMIZATIONS -------${reset}"
pushd scripts/gatsby-source-iiif/
yarn install
node setupEnv.js ${1} > ${ENV_FILE}
source ${ENV_FILE}
export $(cut -d= -f1 ${ENV_FILE})
./generate.sh ${1}
popd