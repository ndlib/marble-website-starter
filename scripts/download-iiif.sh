#!/bin/bash
magenta=`tput setaf 5`
reset=`tput sgr0`

pushd scripts/gatsby-source-iiif
yarn install
echo "${magenta}----- Get Manifests -------${reset}"
node getManifests.js
echo "${magenta}----- Build Markdown Pages for Manifests -------${reset}"
node generateMD.js
echo "${magenta}----- Index in ElasticSearch -------${reset}"
node indexSearch.js
echo "${magenta}----- Build Markdown for Categories -------${reset}"
node generateMDCategories.js
popd
