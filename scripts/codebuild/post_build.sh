#!/bin/bash
magenta=`tput setaf 5`
reset=`tput sgr0`

echo "${magenta}----- POST-BUILD -----${reset}"
# rsync -av ./site/public/ ./public
[[ ! -z "$TRAVIS_RUN" ]] yarn workspace site deploy
