import typy from 'typy'

export const savePortfolioUser = ({ user, loginReducer }) => {
  const query = JSON.stringify({
    query: `mutation {
  savePortfolioUser(
    bio: """${encodeURIComponent(user.bio)}""",
    email: "${encodeURIComponent(user.email)}",
    fullName: "${encodeURIComponent(user.fullName)}"
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
      title: "${encodeURIComponent(emptyString(portfolio.title))}",
      privacy: ${portfolio.privacy},
      layout: "${portfolio.layout}",
      description: "${encodeURIComponent(emptyString(portfolio.description))}",
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
      annotation: "${encodeURIComponent(emptyString(item.annotation))}",
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
  const isOwner = (loginReducer && loginReducer.user && loginReducer.user.netid && userName && loginReducer.user.netid === userName)

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
          portfolioItems {
            items {
              portfolioItemId
            }
          }
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
  let url = process.env.GRAPHQL_API_URL
  console.log('1:', url)
  url = 'https://m2tflrkkyrc3jlcqjyc4bhiviq.appsync-api.us-east-1.amazonaws.com/graphql'
  console.log('2:', url)
  const headers = {
    'Content-Type': 'application/json',
  }

  if (usePublicUrl) {
    // follow URL should come from configuration instead
    url = 'https://t8mhrjrn63.execute-api.us-east-1.amazonaws.com/prod/query/getPortfolioCollection'
    console.log('3:', url)
  } else {
    headers.Authorization = typy(loginReducer, 'token.idToken').safeString
    // console.log(typy(loginReducer, 'token.idToken').safeString)
  }

  // console.log(url)
  return fetch(
    url,
    {
      method: 'POST',
      signal: signal,
      headers: headers,
      body: query,
      mode: 'cors',
    })
    .then(result => {
      return result.json()
    })
    .then((result) => {
      return typy(result, contentType).safeObjectOrEmpty
    })
    .then(result => {
      // console.log('unsanitary', result)
      // fix some fields that might be at the top level
      const fixableFields = ['bio', 'email', 'fullName', 'description', 'annotation', 'title']
      fixableFields.forEach(field => {
        if (typy(result, field).isString) {
          result[field] = decodeURIComponent(result[field])
        }
      })
      // fix collection title and description
      if (typy(result, 'portfolioCollections.items').isArray) {
        result.portfolioCollections.items.forEach((item, index) => {
          if (item.title) {
            result.portfolioCollections.items[index].title = decodeURIComponent(result.portfolioCollections.items[index].title)
          }
          if (item.description) {
            result.portfolioCollections.items[index].description = decodeURIComponent(result.portfolioCollections.items[index].description)
          }
        })
      }
      // fix item annotation
      if (typy(result, 'portfolioItems.items').isArray) {
        result.portfolioItems.items.forEach((item, index) => {
          if (item.annotation) {
            result.portfolioItems.items[index].annotation = decodeURIComponent(result.portfolioItems.items[index].annotation)
          }
        })
      }
      // console.log('sanitary', result)
      return result
    })
}
