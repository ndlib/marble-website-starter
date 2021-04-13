#!/usr/bin/env node

const AWS = require('aws-sdk')

const appConfig = process.argv.slice(2)[0]

const possibleKeys = [
  'GRAPHQL_API_KEY',
  'GRAPHQL_API_URL',
  'AUTH_CLIENT_ID',
  'AUTH_CLIENT_URL',
  'AUTH_CLIENT_ISSUER',
]

const retrieveStageParameters = async () => {
  const ssm = new AWS.SSM({ region: 'us-east-1' })
  const params = await ssm.getParametersByPath({
    Path: appConfig,
    Recursive: true,
    WithDecryption: true,
  }).promise().catch((err) => {
    console.error('Failed getting parameter: ' + appConfig)
    console.error(err)
  })
  params['Parameters'].forEach(node => {
    const paramName = node['Name']
    const envName = paramName.substring(paramName.lastIndexOf('/') + 1, paramName.length).toUpperCase().replace(/[-]/g, '_')
    if (possibleKeys.includes(envName)) {
      console.log(`${envName}='${node['Value']}'`)
    }
  })
}

new Promise(async (resolve, reject) => {
  retrieveStageParameters()
  resolve()
})
