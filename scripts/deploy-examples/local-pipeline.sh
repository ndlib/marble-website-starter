PROGNAME=$0

RED='\033[0;31m'
GREEN='\033[0;32m'
NC='\033[0m' # No Color

usage() {
  cat << EOF >&2
Usage: $PROGNAME stackname path-to-blueprints

Deployes the pipeline for testing in testlibnd mostly
Example: ./scripts/deploy-examples/local-pipeline.sh marble-website-deployment ../mellon-blueprints/

EOF
  exit 1
}
``
stackName=$1
export BLUEPRINTS_DIR=$2
templatePath="/deploy/cloudformation/static-host-pipeline.yml"
aws cloudformation deploy \
  --region us-east-1 \
  --capabilities CAPABILITY_IAM \
  --stack-name $stackName \
  --template-file "$BLUEPRINTS_DIR/$templatePath" \
  --parameter-overrides SourceRepoOwner=ndlib \
    TestStackName=marble-website-test \
    ProdStackName=marble-website-prod \
    CDBranchName=master
