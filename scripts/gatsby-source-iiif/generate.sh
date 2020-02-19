site=$1
client=$2
pushd scripts/gatsby-source-iiif
yarn install
node getManifests.js $site
node generateMD.js $site
node getSchema.js $site
[ -n $client ] && node indexSearch.js $site $client
node generateMDCategories.js $site
popd
