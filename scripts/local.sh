#!/bin/bash

# ${1} should be APP_CONFIG value
./scripts/codebuild/install.sh ${1} || { exit 1; }
./scripts/codebuild/pre_build.sh || { exit 1; }
./scripts/codebuild/build.sh || { exit 1; }
./scripts/codebuild/post_build.sh || { exit 1; }
