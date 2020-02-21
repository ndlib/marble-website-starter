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

## get environment variable from parameter store.
export APP_CONFIG=${1}

pushd scripts/gatsby-source-iiif
yarn install
node setupEnv.js > .env
node getManifests.js
node generateMD.js
node getSchema.js
node indexSearch.js
node generateMDCategories.js
popd
