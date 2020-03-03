import typy from 'typy'

export const getData = ({ loginReducer, contentType, id, successFunc, errorFunc, signal }) => {
  if (loginReducer.userContentPath && contentType && id) {
    fetch(
      `${loginReducer.userContentPath}${contentType}/${id}`,
      {
        method: 'GET',
        signal: signal,
        headers: {
          Authorization: typy(loginReducer, 'token.idToken').safeString,
        },
        mode: 'cors',
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
}

export const createData = ({ loginReducer, contentType, id, body, successFunc, errorFunc }) => {
  if (loginReducer.userContentPath && contentType && id) {
    fetch(
      `${loginReducer.userContentPath}${contentType}/${id}`,
      {
        method: 'POST',
        headers: {
          Authorization: typy(loginReducer, 'token.idToken').safeString,
        },
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
}

export const patchData = ({ loginReducer, contentType, id, body, successFunc, errorFunc }) => {
  if (loginReducer.userContentPath && contentType && id) {
    fetch(
      `${loginReducer.userContentPath}${contentType}/${id}`,
      {
        method: 'PATCH',
        headers: {
          Authorization: typy(loginReducer, 'token.idToken').safeString,
          'Access-Control-Request-Method': 'PATCH',
          'Access-Control-Request-Headers': 'Authorization',
        },
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
}

export const deleteData = ({ loginReducer, contentType, id, successFunc, errorFunc }) => {
  if (loginReducer.userContentPath && contentType && id) {
    fetch(
      `${loginReducer.userContentPath}${contentType}/${id}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: typy(loginReducer, 'token.idToken').safeString,
          'Access-Control-Request-Method': 'DELETE',
          'Access-Control-Request-Headers': 'Authorization',
        },
        mode: 'cors',
      })
      .then(async (result) => {
        if (result.status === 204) {
          successFunc()
        }
      })
      .catch((error) => {
        errorFunc(error)
      })
  }
}
