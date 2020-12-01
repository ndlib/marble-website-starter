
const url = 'https://nddev.service-now.com/api/uond/anonymous_incident'

export const createData = ({ body, successFunc, errorFunc }) => {
  fetch(
    (url),
    {
      method: 'POST',
      mode: 'no-cors',
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
