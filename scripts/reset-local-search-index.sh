#!/bin/bash

SITE=$1
BASE_DIR="${PWD}"
SITE_DIR="${BASE_DIR}/sites/${SITE}"
ENV_FILE="${SITE_DIR}/.env.development"

pushd scripts/gatsby-source-iiif/

  echo "${magenta}----- Index -------${reset}"
  node indexSearch.js ${ENV_FILE} || { echo "Unable to send data to site index" ;exit 1; }
popd
