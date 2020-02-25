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

site="../../site"
export APP_CONFIG=${1}
if [ -z $APP_CONFIG ]; then
  echo "ERROR, variable empty"
fi
pushd scripts/gatsby-source-iiif
yarn install

sh ../gatsby-source-iiif/generate.sh
