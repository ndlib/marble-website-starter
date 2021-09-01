import typy from 'typy'

export const savePortfolioUser = ({ user, loginReducer }) => {
  const query = JSON.stringify({
    query: `mutation {
  savePortfolioUser(
    bio: """${user.bio}""",
    email: "${user.email}",
    fullName: "${user.fullName}"
  ) {
    bio
    dateAddedToDynamo
    dateModifiedInDynamo
    department
    email
    fullName
    portfolioUserId
    primaryAffiliation
    portfolioCollections {
      items {
        portfolioCollectionId
        imageUri
        description
        portfolioUserId
        title
      }
    }
  }
}`,
  })

  return getData({ loginReducer: loginReducer, contentType: 'data.savePortfolioUser', query: query })
}

export const savePortfolioCollectionQuery = ({ portfolio, loginReducer }) => {
  const query = JSON.stringify({
    query: `mutation {
    savePortfolioCollection(
      ${(portfolio.portfolioCollectionId) ? `portfolioCollectionId: "${portfolio.portfolioCollectionId}"` : ''},
      ${(portfolio.featuredCollection) ? `featuredCollection: ${portfolio.featuredCollection}"` : ''},
      ${(portfolio.highlightedCollection) ? `highlightedCollection: ${portfolio.highlightedCollection}"` : ''},
      title: "${emptyString(portfolio.title)}",
      privacy: ${portfolio.privacy},
      layout: "${portfolio.layout}",
      description: "${emptyString(portfolio.description)}",
      imageUri: "${emptyString(portfolio.imageUri)}"
    ) {
      dateAddedToDynamo
      dateModifiedInDynamo
      description
      featuredCollection
      highlightedCollection
      imageUri
      layout
      portfolioCollectionId
      portfolioUserId
      privacy
      title
      portfolioItems {
        items {
          annotation
          dateAddedToDynamo
          dateModifiedInDynamo
          description
          imageUri
          internalItemId
          itemType
          portfolioCollectionId
          portfolioItemId
          portfolioUserId
          sequence
          title
          uri
        }
      }
    }
  }`,
  })

  return getData({ loginReducer: loginReducer, contentType: 'data.savePortfolioCollection', query: query })
}

export const savePortfolioItemQuery = ({ item, loginReducer }) => {
  const query = JSON.stringify({
    query: `mutation {
    savePortfolioItem(
      portfolioCollectionId: "${item.portfolioCollectionId}",
      portfolioItemId: "${item.portfolioItemId}"
      imageUri: "${item.imageUri}",
      internalItemId: "${item.portfolioItemId}"
      itemType: internal,
      sequence: ${item.sequence},
      title: "${emptyString(item.title)}",
      annotation: "${emptyString(item.annotation)}",
      description: "${emptyString(item.description)}",
    ) {
      portfolioItemId
      portfolioCollectionId
      imageUri
      sequence
      title
      annotation
    }
  }
  `,
  })
  return getData({ loginReducer: loginReducer, contentType: 'data.savePortfolioItem', query: query })
}

const emptyString = (field) => {
  if (typeof (field) === 'undefined' || field === null) {
    return ''
  }
  return field
}

export const getPortfolioUser = ({ userName, loginReducer }) => {
  const isOwner = (loginReducer && loginReducer.user && loginReducer.user.portfolioUserId && userName && loginReducer.user.portfolioUserId === userName)

  const query = JSON.stringify({
    query: `query {
    getPortfolioUser(portfolioUserId: "${userName}") {
      bio
      dateAddedToDynamo
      dateModifiedInDynamo
      department
      email
      fullName
      portfolioUserId
      primaryAffiliation
      portfolioCollections {
        items {
          portfolioCollectionId
          imageUri
          description
          portfolioUserId
          dateAddedToDynamo
          dateModifiedInDynamo
          privacy
          title
        }
      }
    }
  }`,
  })

  return getData({ loginReducer: loginReducer, contentType: 'data.getPortfolioUser', query: query, usePublicUrl: !isOwner })
}

export const getPortfolioQuery = ({ portfolioId, isOwner, loginReducer }) => {
  const query = JSON.stringify({
    query: `'query {'
    getPortfolioCollection(portfolioCollectionId: "${portfolioId}") {
      dateAddedToDynamo
      dateModifiedInDynamo
      description
      featuredCollection
      highlightedCollection
      imageUri
      layout
      portfolioCollectionId
      portfolioUserId
      privacy
      title
      portfolioItems {
        items {
          annotation
          dateAddedToDynamo
          dateModifiedInDynamo
          description
          imageUri
          internalItemId
          itemType
          portfolioCollectionId
          portfolioItemId
          portfolioUserId
          sequence
          title
          uri
        }
      }
    }
  }`,
  })
  console.log(query)
  console.log(isOwner)

  return getData({ loginReducer: loginReducer, contentType: 'data.getPortfolioCollection', query: query, usePublicUrl: !isOwner })
}

export const removeCollection = ({ portfolio, loginReducer }) => {
  const query = JSON.stringify({
    query: `mutation { removePortfolioCollection(portfolioCollectionId: "${portfolio.portfolioCollectionId}") {
    recordsDeleted
  } }`,
  })
  return getData({ loginReducer: loginReducer, contentType: 'data.removePortfolioCollection', query: query })
}

export const removeCollectionItem = ({ item, loginReducer }) => {
  const query = JSON.stringify({
    query: `mutation { removePortfolioItem(portfolioItemId: "${item.portfolioItemId}", portfolioCollectionId: "${item.portfolioCollectionId}") {
    recordsDeleted
  } }`,
  })
  return getData({ loginReducer: loginReducer, contentType: 'data.removePortfolioCollection', query: query })
}

export const getData = ({ loginReducer, contentType, query, usePublicUrl, signal }) => {
  console.log('query', contentType)
  let url = 'https://m2tflrkkyrc3jlcqjyc4bhiviq.appsync-api.us-east-1.amazonaws.com/graphql'
  url = 'https://aeo5vugbxrgvzkhjjoithljz4y.appsync-api.us-east-1.amazonaws.com/graphql'

  const headers = {
    'Content-Type': 'application/json',
  }

  if (usePublicUrl) {
    url = 'https://496ozs7o1j.execute-api.us-east-1.amazonaws.com/prod/query/getPortfolioCollection'
  } else {
    headers.Authorization = typy(loginReducer, 'token.idToken').safeString
  }

  return fetch(
    // `${loginReducer.userContentPath}${contentType}/${id}`,
    url,
    {
      method: 'POST',
      signal: signal,
      headers: {
        Authorization: typy(loginReducer, 'token.idToken').safeString,
        'Content-Type': 'application/json',
      },
      body: query,
      mode: 'cors',
    })
    .then(result => {
      return result.json()
    })
    .then((result) => {
      return typy(result, contentType).safeObjectOrEmpty
    })
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
  console.error('ERROR function deleteData removed.')
// if (loginReducer.userContentPath && contentType && id) {
//   fetch(
//     `${loginReducer.userContentPath}${contentType}/${id}`,
//     {
//       method: 'DELETE',
//       headers: {
//         Authorization: typy(loginReducer, 'token.idToken').safeString,
//         'Access-Control-Request-Method': 'DELETE',
//         'Access-Control-Request-Headers': 'Authorization',
//       },
//       mode: 'cors',
//     })
//     .then(async (result) => {
//       if (result.status === 204) {
//         successFunc()
//       }
//     })
//     .catch((error) => {
//       errorFunc(error)
//     })
// }
}
