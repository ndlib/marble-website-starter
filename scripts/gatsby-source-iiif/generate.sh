yarn install

site="../../site"
node getStandard.js ${site}

printenv
[[ ! -z "$CI" ]] && node indexSearch.js ${site}
