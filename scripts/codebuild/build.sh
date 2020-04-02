#!/bin/bash
magenta=`tput setaf 5`
reset=`tput sgr0`
echo "${magenta}----- BUILD -----${reset}"

# generated in install.sh
ENV_FILE="${PWD}/.env"
echo "BUILD ENV: ${ENV_FILE}"
echo "$(cat ${ENV_FILE})"

source ${ENV_FILE}
export $(cut -d= -f1 ${ENV_FILE})
echo "BUILD SEARCH URL: ${SEARCH_URL}"
echo "BUILD SEARCH INDEX: ${SEARCH_INDEX}"
export SEARCH_URL=${SEARCH_URL}
export SEARCH_INDEX=${SEARCH_INDEX}
# build
yarn workspace site clean
yarn workspace site build || { echo "\e[31mGatsby build failed${reset}"; exit 1; }
