#!/bin/bash
magenta=`tput setaf 5`
reset=`tput sgr0`
echo "${magenta}----- BUILD -----${reset}"

# build
gatsby build || { echo "Gatsby build failed" ;exit 1; }
