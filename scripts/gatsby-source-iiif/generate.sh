yarn install
site="../../site"
node getManifests.js ${site}
echo "Get Manifests"
echo $?
# node downloadJsonAssets.js ${site}
node generateMD.js ${site}
echo "Generate MD"
echo $?

node getSchema.js ${site}

if [ "${1}" != "local" ]; then
  node indexSearch.js ${site}
fi
