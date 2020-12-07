site="../../site"

yarn global add gatsby-cli || { echo "FATAL: Could not install Gatsby Command Line Tools";exit 1; }

mkdir ~/.config/gatsby
cp ./scripts/codebuild/config.json ~/.config/gatsby/

yarn install || { echo "yarn install failed" ;exit 1; }

pushd scripts/gatsby-source-iiif/
  yarn install
  node getStandard.js ${site}
  cp "${site}/.env.test" "${site}/.env.production"
popd

# trap all errors as failure counts
failures=0
trap 'failures=$((failures+1))' ERR

yarn workspace @ndlib/gatsby-theme-marble test
yarn workspace site test

if ((failures != 0)); then
  echo "${magenta}TESTS FAILED${reset}"
  exit 1
fi

yarn workspace site build
