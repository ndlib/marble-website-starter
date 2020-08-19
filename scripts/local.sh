#!/bin/bash

yarn workspace site clean

# ${1} should be parameter store path, otherwise will default to "local"
export PARAM_CONFIG_PATH=${1:-"local"}
./scripts/codebuild/install.sh || { exit 1; }
./scripts/codebuild/pre_build.sh || { exit 1; }
./scripts/codebuild/build.sh || { exit 1; }
./scripts/codebuild/post_build.sh || { exit 1; }
