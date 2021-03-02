const os = require('os')
const dns = require('dns')
const url = require('url')

module.exports = async (apiURL) => {
  if (os.type().toLowerCase() === 'darwin') {
    const baseUrl = new url.URL(apiURL)
    await dns.lookup(baseUrl.hostname, (err, addresses) => {
      if (err) {
        console.error(err)
        return err
      }
      console.log('')
      console.log('==========================================================')
      console.log('')
      console.log('We\'re on MacOS. DNS resolution is not good here.')
      console.log('If you are having trouble connecting to the source API, try adding the following entry to your /etc/hosts file.')
      console.log('')
      console.log('sudo nano /etc/hosts')
      console.log('')
      console.log(addresses, baseUrl.hostname)
      console.log('')
      console.log('After it has been updated, run the following command:')
      console.log('sudo dscacheutil -flushcache')
      console.log('')
      console.log('==========================================================')
      console.log('')
    })
  }
}
