yarn install

site="../../site"
# node getManifests.js ${site}
# node generateMD.js ${site}
node getSchema.js ${site}
node indexSearch.js ${site}
