yarn install
site="../../site"
node getManifests.js ${site}
node generateMD.js ${site}
node getSchema.js ${site}
node -r dotenv/config indexSearch.js ${site} dotenv_config_path=${DOTENV_CONFIG}
