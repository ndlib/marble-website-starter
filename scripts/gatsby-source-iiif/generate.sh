yarn install

site="../../sites/marble"
node getStandard.js ${site}

printenv
[[ ! -z "$CI" ]] && node indexSearch.js ${site}
