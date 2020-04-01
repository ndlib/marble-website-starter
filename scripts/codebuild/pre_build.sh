#!/bin/bash
magenta=`tput setaf 5`
reset=`tput sgr0`
echo "${magenta}----- TESTS ------${reset}"

yarn workspace @ndlib/gatsby-theme-marble test || { echo "\e[31mUnit Tests Failed${reset}"; exit 1; }
