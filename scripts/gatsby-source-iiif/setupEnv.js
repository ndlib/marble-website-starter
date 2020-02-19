const AWS = require('aws-sdk')

const appConfig = process.env.APP_CONFIG

const retrieveStageParameters = async () => {
  const ssm = new AWS.SSM({ region: 'us-east-1' })
  const data = await ssm.getParametersByPath({
    Path: appConfig,
    Recursive: true,
    WithDecryption: true,
  }).promise().catch((err) => {
    console.error('Failed getting parameter: ' + appConfig)
    console.error(err)
  })
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
