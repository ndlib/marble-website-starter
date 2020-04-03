yarn install
site="../../site"
node getManifests.js ${site}
# node downloadJsonAssets.js ${site}
node generateMD.js ${site}
node getSchema.js ${site}
if [ "${1}" != "local" ]; then
  node indexSearch.js ${site}
fi
