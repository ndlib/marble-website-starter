
#!/bin/bash
magenta=`tput setaf 5`
reset=`tput sgr0`
echo "${magenta}----- BUILD -----${reset}"

# generated in install.sh
ENV_FILE="${PWD}/.env"
echo "BUILD ENV: ${ENV_FILE}"
source ${ENV_FILE}
export $(cut -d= -f1 ${ENV_FILE})

# build
# export NODE_OPTIONS="--max_old_space_size=6144"
yarn workspace marble build
