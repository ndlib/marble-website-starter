const fetch = require('node-fetch')
const base64 = require('base-64');

class FMRest {
    constructor() {
        this.host = "https://fm.library.nd.edu/"
        this.database = "SRP"
        this.layout = "Structures"
        this.url = `${this.host}/fmi/data/v1/databases/${this.database}/sessions`;
        this.token = null;
        this.tokenRefresh = null;
        this.tokenString = null;
        this.user = "stub"
        this.password = "stub"
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
    login() {
        const encodedUserAndPassword = base64.encode(`${this.user}:${this.password}`);

        return fetch(this.url, {
                method: 'post',
                headers: {
                    'Authorization': (`Basic ${encodedUserAndPassword}`),
                    'Content-Type': 'application/json'
                },
                body: "{}" // requires an empty body
            })
            .then(body => body.json())
            .then(body => {
                let { messages } = body;
                let { code } = messages[0];
                let { response } = body;
                let { token } = response;
                if(code === '0') { // OK
                    this.token = token;
                    this.tokenString = `Bearer ${this.token}`;
                }
                console.log(token)
                console.log(messages)
                console.log(code)
                console.log(response)
                console.log(this.tokenString)
                return body;
            })
            .catch(res => {
                return res.error;
        });
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
     logout() {
        return fetch((`${this.url}/${this.getToken()}`), {
                method: 'delete',
                headers: {
                    'Content-Type': `application/json`
                }
            })
            .then(body => body.json())
            .then(body => {
                return body;
            })
            .catch(res => {
                return res.error;
            });
    }

    /**
     * Get a Record
     * @param {number} id - filemakers internal record id
     * @param {Array} portals - An Array of {@link Portal} Objects
     * @return {Promise} - A promise that resolves with a res
     */
    getAll(id) {
        let url = `${this.host}/fmi/data/v1/databases/${this.database}/layouts/${this.layout}/records?_limit=1000`;
        // url = `${url}/${id}`;
        return fetch(url, {
                method: 'get',
                headers: {
                    'Authorization': `Bearer ${this.token}`,
                    'Content-Type': 'application/json'
                },
                json: true
            })
            .then(body => body.json())
            .then(body => {
                console.log(JSON.stringify(body, null, 3));
                return body;
            })
            .catch(res => {
                console.log("ERROR" + res.error)
                return res.error;
            });
    }
}

module.exports = FMRest