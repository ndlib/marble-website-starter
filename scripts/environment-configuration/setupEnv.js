#!/usr/bin/env node

const AWS = require('aws-sdk')
const secretsmanager = new AWS.SecretsManager()

const appConfig = process.argv.slice(2)[0]

const possibleKeys = [
  'GRAPHQL_API_KEY',
  'GRAPHQL_API_URL',
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
      console.log(`${envName}='${node['Value'].trim()}'`)
    }
  })
}

const retrieveFmpSecrets = async () => {
  let secrets = {
    username: 'dev',
    password: 'dev',
    host: 'dev',
    database: 'dev',
  }
  if (process.env.FMP_CRED_PATH) {
    const params = {
      SecretId: process.env.FMP_CRED_PATH,
    }
    const data = await secretsmanager.getSecretValue(params).promise().catch((err) => {
      console.error('Failed getting FMP secrets: ' + process.env.FMP_CRED_PATH)
      console.error(err)
    })
    secrets = JSON.parse(data.SecretString)
  }
  return secrets
}

const retrieveSecretParameters = async () => {
  const fmpSecrets = await retrieveFmpSecrets()
  for (const [key, value] of Object.entries(fmpSecrets)) {
    const fmpKey = `FMP_${key}`.toUpperCase()
    console.log(`${fmpKey}='${value}'`)
  }
}

new Promise(async (resolve, reject) => {
  retrieveStageParameters()
  retrieveSecretParameters()
  resolve()
})
