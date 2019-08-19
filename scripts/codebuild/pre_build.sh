#!/bin/bash
magenta=`tput setaf 5`
reset=`tput sgr0`

echo "${magenta}----- TESTS ------${reset}"

yarn workspace @hesburgh-wse/gatsby-theme-marble test || { echo "Unit Tests Failed"; exit 1; }
