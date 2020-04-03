yarn install
site="../../site"
node getManifests.js ${site}
echo "Get Manifests"
echo $?
# node downloadJsonAssets.js ${site}
node generateMD.js ${site}
echo "Generate MD"
echo $?

#node getSchema.js ${site}
#echo "Get Scheme"
#echo $?

if [ "${1}" != "local" ]; then
  #node indexSearch.js ${site}
  #echo "Index"
  #echo $?

fi
