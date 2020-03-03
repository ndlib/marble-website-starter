site=$1
yarn install
node setupEnv.js > .env
node getManifests.js $site
node generateMD.js $site
node getSchema.js $site
node indexSearch.js $site
