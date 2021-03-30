GRAPHQL_API_KEY_BASE_PATH='/all/stacks/sm-test-maintain-metadata/'
STATIC_SITE_PATH="/all/static-host/marble-website-test/"

# add the config for okta into the env
node ./scripts/gatsby-source-iiif/setupEnv.js ${STATIC_SITE_PATH} > './ssm-params.txt' --unhandled-rejections=strict
source ./ssm-params.txt

# add the app sync keys to the env
#node ./scripts/gatsby-source-iiif/setupEnv.js ${GRAPHQL_API_KEY_BASE_PATH} > './ssm-params.txt' --unhandled-rejections=strict
#source ./ssm-params.txt

# rm ./ssm-params.txt
