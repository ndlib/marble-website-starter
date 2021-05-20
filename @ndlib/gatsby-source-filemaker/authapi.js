const fetch = require('node-fetch')
const base64 = require('base-64')

/**
 * Class representing Authorization
 */
class AuthAPI {
  /**
   * Create an Authorization object
   * @param {Object} obj - An object
   * @param {string} obj.username - username
   * @param {string} obj.password - password
   * @param {string} obj.host - host
   * @param {string} obj.database - database
   * @param {string} obj.layout - layout
   */
  constructor ({ username, password, host, database, layout }) {
    this.database = database
    this.host = host
    this.layout = layout
    this.username = username
    this.password = password
    this.url = `${this.host}/fmi/data/v1/databases/${this.database}/sessions`
    this.token = null
    this.tokenRefresh = null
    this.tokenString = null
  }

  /**
   * Get the hostname
   * @return {string} the host
   */
  getHost () {
    return this.host
  }

  /**
   * Get the layout
   * @return {string} the layout
   */
  getLayout () {
    return this.layout
  }

  /**
   * Set the layout
   * @param {string} the layout
   */
  setLayout (layout) {
    this.layout = layout
  }

  /**
   * Get the database
   * @return {string} the database
   */
  getDatabase () {
    return this.database
  }

  /**
   * Get the token
   * @return {string} the token
   */
  getToken () {
    return this.token
  }

  /**
   * Login to Filemaker Server Data API
   * @return {Promise} Promise resolved with the token
   * Success Response for Basic Auth:
   * {
   *   "response": {
   *     "token": 823c0f48ba80f2187bde6f3859dabd4dcf8ea43be420dfeadf34
   *   },
   *   "messages":[{"code":"0","message":"OK"}]
   * }
   *
   */
  login () {
    const encodedUserAndPassword = base64.encode(
      `${this.username}:${this.password}`,
    )

    return fetch(this.url, {
      method: 'post',
      headers: {
        Authorization: `Basic ${encodedUserAndPassword}`,
        'Content-Type': 'application/json',
      },
      body: '{}', // requires an empty body
    })
      .then((body) => body.json())
      .then((body) => {
        const { messages } = body
        const { code } = messages[0]
        const { response } = body
        const { token } = response
        if (code === '0') { // OK
          this.token = token
          this.tokenString = `Bearer ${this.token}`
        }
        return body
      })
      .catch((res) => {
        console.log(`FMP login error ${res}`)
        return res.error
      })
  }

  /**
   * Logout of Filemaker Server Data API
   * @return {Promise} Promise resolved with boolean
   * Success Response:
   * {
   *    "response":{},
   *    "messages":[{"code":"0","message":"OK"}]
   * }
   */
  logout () {
    return fetch(`${this.url}/${this.getToken()}`, {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((body) => body.json())
      .then((body) => {
        return body
      })
      .catch((res) => {
        console.log(`FMP logout error ${res}`)
        return res.error
      })
  }
}

module.exports = AuthAPI
