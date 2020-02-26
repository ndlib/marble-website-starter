export const patchData = (loginReducer, contentType, id, body, successFunc, errorFunc) => {
  fetch(
    `${loginReducer.userContentPath}${contentType}/${id}`,
    {
      method: 'PATCH',
      headers: {
        Authorization: loginReducer.token.idToken,
        'Access-Control-Request-Method': 'PATCH',
        'Access-Control-Request-Headers': 'Authorization',
      },
      mode: 'cors',
      body: JSON.stringify(body),
    },
  )
    .then(result => {
      return result.json()
    })
    .then((r) => {
      successFunc(r)
    })
    .catch((error) => {
      errorFunc(error)
    })
}

export const deleteData = (loginReducer, contentType, id, successFunc, errorFunc) => {
  fetch(
    `${loginReducer.userContentPath}${contentType}/${id}`,
    {
      method: 'DELETE',
      headers: {
        Authorization: loginReducer.token.idToken,
        'Access-Control-Request-Method': 'DELETE',
        'Access-Control-Request-Headers': 'Authorization',
      },
      mode: 'cors',
    },
  )
    .then(async (result) => {
      if (result.status === 204) {
        successFunc()
      }
    })
    .catch((error) => {
      errorFunc(error)
    })
}
