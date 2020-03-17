#!/bin/bash
magenta=`tput setaf 5`
reset=`tput sgr0`
echo "${magenta}----- BUILD -----${reset}"

# generated in install.sh
ENV_FILE="${PWD}/.env"
echo "BUILD ENV: ${ENV_FILE}"
source ${ENV_FILE}
export $(cut -d= -f1 ${ENV_FILE})
env | grep SEARCH

# build
yarn workspace site build || { echo "Gatsby build failed" ;exit 1; }
