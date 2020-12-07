yarn install

site="../../site"
node getStandard.js ${site}

printenv 
[[ ! -z "$TRAVIS_RUN" ]] && node indexSearch.js ${site}
