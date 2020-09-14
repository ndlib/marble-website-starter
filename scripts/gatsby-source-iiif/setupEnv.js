const AWS = require('aws-sdk')

const appConfig = process.argv.slice(2)[0]
const envOnlyParams = ['SEARCH_URL', 'SEARCH_INDEX']

const retrieveStageParameters = async () => {
  let data = {}
  if (appConfig === 'local') {
    data = { Parameters: [
      {
        Name: '/all/static-host/super-test/search_url',
        Value: 'https://search-marble-elasticsearch-test-e3urdt7kb667o7verxgn6bjoee.us-east-1.es.amazonaws.com',
      },
      {
        Name: '/all/static-host/super-test/search_index',
        Value: 'test_index',
      },
      {
        Name: '/all/static-host/super-test/google_map_key',
        Value: 'AIzaSyDU35NMls6bvw0KBu6ImPoJN8dGmNA6f3s',
      },
      {
        Name: '/all/static-host/super-test/user_content_path',
        Value: 'https://b9mic83lu2.execute-api.us-east-1.amazonaws.com/prod/',
      },
      {
        Name: '/all/static-host/super-test/auth_client_url',
        Value: 'https://okta.nd.edu',
      },
      {
        Name: '/all/static-host/super-test/auth_client_id',
        Value: '0oa1f3ut0aKpdwap5357',
      },
      {
        Name: '/all/static-host/super-test/auth_client_issuer',
        Value: 'https://okta.nd.edu/oauth2/ausxosq06SDdaFNMB356',
      },
    ] }
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
    let value = node['Value']
    if (process.env[envName.toUpperCase()]) {
      value = process.env[envName.toUpperCase()]
    }
    console.log(`${envName.toUpperCase()}=${value}`)
  })

  if (appConfig !== 'local') {
    envOnlyParams.forEach((envName) => {
      console.log(`${envName.toUpperCase()}=${process.env[envName.toUpperCase()]}`)
    })
  }
}

new Promise(async (resolve, reject) => {
  retrieveStageParameters()
  resolve()
})
