import fetch from 'isomorphic-fetch'
const proxyurl = 'https://cors-anywhere.herokuapp.com/'
const url = 'https://nddev.service-now.com/api/uond/anonymous_incident'

export const createData = ({ body, successFunc, errorFunc }) => {
  fetch(
    (proxyurl + url),
    {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify(body),
    })
    .then(result => {
      return result.json()
    })
    .then((data) => {
      successFunc(data)
    })
    .catch((error) => {
      errorFunc(error)
    })
}
