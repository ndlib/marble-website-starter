const AWS = require('aws-sdk')

const appConfig = process.argv.slice(2)[0]

const retrieveStageParameters = async () => {
  let data = {}
  console.log('APP_CONFIG=' + appConfig)
  if (appConfig === 'local') {
    console.log('using local config settings')
    data = { Parameters: [
      {
        Name: '/all/static-host/super-test/search_url',
        Value: 'https://search-marble-elasticsearch-test-e3urdt7kb667o7verxgn6bjoee.us-east-1.es.amazonaws.com',
      },
      {
        Name: '/all/static-host/super-test/search_index',
        Value: 'test_index',
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
    console.log(`${envName.toUpperCase()}=${node['Value']}`)
  })
}

new Promise(async (resolve, reject) => {
  retrieveStageParameters()
  resolve()
})
