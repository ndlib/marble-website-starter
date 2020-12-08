#!/bin/bash
magenta=`tput setaf 5`
reset=`tput sgr0`

echo "${magenta}----- POST-BUILD -----${reset}"

printenv
if [[ ! -z "$CI" ]]
  then
    yarn workspace site deploy
fi
