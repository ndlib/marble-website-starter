site=$1
pushd scripts/gatsby-source-iiif
yarn install
node setupEnv.js > .env
node getManifests.js $site
node generateMD.js $site
node getSchema.js $site
node indexSearch.js $site
node generateMDCategories.js $site
popd
