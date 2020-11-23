
#!/bin/bash
magenta=`tput setaf 5`
reset=`tput sgr0`
echo "${magenta}----- BUILD -----${reset}"

# generated in install.sh
ENV_FILE="${PWD}/.env"
echo "BUILD ENV: ${ENV_FILE}"
pwd
ls -la
source ${ENV_FILE}
export $(cut -d= -f1 ${ENV_FILE})

echo "$(cat ${ENV_FILE})"
echo "BUILD SEARCH URL: ${SEARCH_URL}"
echo "BUILD SEARCH INDEX: ${SEARCH_INDEX}"

# build
# export NODE_OPTIONS="--max_old_space_size=6144"
yarn workspace site build
