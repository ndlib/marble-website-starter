#!/bin/bash
magenta=`tput setaf 5`
reset=`tput sgr0`

echo "${magenta}----- POST-BUILD -----${reset}"
# rsync -av ./site/public/ ./public
yarn workspace site deploy
