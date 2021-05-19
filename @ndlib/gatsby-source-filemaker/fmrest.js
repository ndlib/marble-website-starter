const AuthAPI = require('./authapi.js')

class FMRest {
  /**
   * Create an FMRest object
   * @param {Object} obj - An object
    * @param {string} obj.username - username
     * @param {string} obj.password - password
     * @param {string} obj.host - host
     * @param {string} obj.database - database
     * @param {string} obj.layout - layout (optional)
     */
  constructor ({ username, password, host, database, layout = null } = {}) {
    this.url = `${host}/fmi/data/v1/databases/${database}`
    this.Auth = new AuthAPI({ username, password, host, database, layout })
  }

  /**
       * Login wrapper
       * @return {Promise} - A promise that resolves with a token
       */
  login () {
    return this.Auth.login()
  }

  /**
   * Logout wrapper
   * @return {Promise} - A promise that resolves with a boolean
   */
  logout () {
    return this.Auth.logout()
  }

  /**
   * Get all records for a layout
   * @param {layout} string - filemaker layout
   * @return {Promise} - A promise that resolves with a response
   */
  getAll (layout) {
    const getRecords = `${this.url}/layouts/${layout}/records?_limit=2000`
    return fetch(getRecords, {
      method: 'get',
      headers: {
        Authorization: `Bearer ${this.Auth.getToken()}`,
        'Content-Type': 'application/json',
      },
      json: true,
    })
      .then((body) => body.json())
      .then((body) => {
        // console.log(JSON.stringify(body, null, 3)) // print response
        return body
      })
      .catch((res) => {
        console.log(`FMP getAll error ${res}`)
        return res.error
      })
  }
}

module.exports = FMRest
