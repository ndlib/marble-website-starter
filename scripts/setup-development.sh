SITE=$1
BASE_DIR="${PWD}"
SITE_DIR="${BASE_DIR}/sites/${SITE}"
ENV_FILE="${SITE_DIR}/.env.development"
EXAMPLE_FILE="${SITE_DIR}/.env.development.example"

cp ${EXAMPLE_FILE} ${ENV_FILE}

GRAPHQL_API_KEY_BASE_PATH='/all/stacks/sm-test-maintain-metadata/'
#export FMP_CRED_PATH="/all/filemaker_credentials"

# add the app sync keys to the env
node ./scripts/environment-configuration/setupEnv.js ${GRAPHQL_API_KEY_BASE_PATH} >> ${ENV_FILE} --unhandled-rejections=strict

echo "Reset .env.development and double check your keys."
