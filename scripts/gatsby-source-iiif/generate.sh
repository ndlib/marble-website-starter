yarn install

site="../../site"
# node getManifests.js ${site}
# node generateMD.js ${site}
node getStandard.js ${site}
# node getImageInfo.js ${site}
# node downloadImages.js ${site}
node indexSearch.js ${site}
