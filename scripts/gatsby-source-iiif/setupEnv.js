const AWS = require('aws-sdk')

const appConfig = process.env.APP_CONFIG

const retrieveStageParameters = async () => {
  let data = {}
  console.log("APP_CONFIG = " + appConfig)
  if('local' == appConfig) {
    console.log("using local config settings")
    data = { Parameters: [
        {
          'Name': '/all/static-host/super-test/search_url',
          'Value': 'https://search-super-testy-search-test-xweemgolqgtta6mzqnuvc6ogbq.us-east-1.es.amazonaws.com'
        },
        {
          'Name': '/all/static-host/super-test/search_index',
          'Value': 'test_index'
        }
    ]}
  } else {
    const ssm = new AWS.SSM({ region: 'us-east-1' })
    data = await ssm.getParametersByPath({
      Path: appConfig,
      Recursive: true,
      WithDecryption: true,
    }).promise().catch((err) => {
      console.error('Failed getting parameter: ' + appConfig)
      console.error(err)
    })
  }
  data['Parameters'].forEach(node => {
    const paramName = node['Name']
    const envName = paramName.substring(paramName.lastIndexOf('/') + 1, paramName.length)
    console.log(`${envName.toUpperCase()}=${node['Value']}`)
  })
}

new Promise(async (resolve, reject) => {
  retrieveStageParameters()
  resolve()
})
