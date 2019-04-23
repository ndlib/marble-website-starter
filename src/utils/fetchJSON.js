// Perform a basic fetch operation
// Return the response as JSON if successful
// Throw a new error otherwise
export default (url) => {
  return fetch(url, { method: 'get' }).then(response => {
    if (response.status >= 200 && response.status < 400) {
      return response.json()
    } else {
      throw new Error(response.statusText)
    }
  })
}
