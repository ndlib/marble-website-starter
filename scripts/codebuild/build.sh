#!/bin/bash
magenta=`tput setaf 5`
reset=`tput sgr0`
echo "${magenta}----- BUILD -----${reset}"

# build
yarn workspace site build || { echo "Gatsby build failed" ;exit 1; }
