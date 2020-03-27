#!/bin/bash

yarn workspace site clean

# ${1} should be parameter store path or local
./scripts/codebuild/install.sh ${1} || { exit 1; }
./scripts/codebuild/pre_build.sh || { exit 1; }
./scripts/codebuild/build.sh || { exit 1; }
./scripts/codebuild/post_build.sh || { exit 1; }
