const AWS = require('aws-sdk')

const appConfig = process.env.APP_CONFIG

const retrieveStageParameters = async () => {
  const ssm = new AWS.SSM({region: 'us-east-1'})
  const data = await ssm.getParametersByPath({
    Path: appConfig,
    Recursive: true,
    WithDecryption: true,
  }).promise().catch((err) => {
    console.error('Failed getting parameter: ' + appConfig)
    console.error(err)
  });
  data['Parameters'].forEach(node => {
    param_name = node['Name']
    env_name = param_name.substring(param_name.lastIndexOf('/') + 1, param_name.length)
    console.log(`${env_name.toUpperCase()}=${node['Value']}`)
  })
}

new Promise(async (resolve, reject) => {
  retrieveStageParameters()
  resolve()
})
