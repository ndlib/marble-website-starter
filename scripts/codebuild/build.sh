#!/bin/bash
magenta=`tput setaf 5`
reset=`tput sgr0`
echo "${magenta}----- BUILD -----${reset}"

# set in install.sh
echo "BUILD DOTENV: ${DOTENV_CONFIG}"
source ${DOTENV_CONFIG}

# build
yarn workspace site build || { echo "Gatsby build failed" ;exit 1; }
