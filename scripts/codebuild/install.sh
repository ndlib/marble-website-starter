#!/bin/bash
magenta=`tput setaf 5`
reset=`tput sgr0`
echo "${magenta}----- INSTALL -------${reset}"

## install yarn
npm install -g yarn || { echo "Npm install failed" ;exit 1; }

## install gatsby
yarn global add gatsby-cli || { echo "Could not install Gatsby Command Line Tools";exit 1; }

## install app dependencies
yarn install || { echo "yarn install failed" ;exit 1; }

echo "${magenta}----- CUSTOMIZATIONS -------${reset}"
## install external customizations
## TODO Copy external dependencies such as:
####  src/assets/logos/*
####  content/*
pushd plugins/gatsby-source-iiif
yarn install
node getManifests.js
node generateMD.js
node indexSearch.js
popd
