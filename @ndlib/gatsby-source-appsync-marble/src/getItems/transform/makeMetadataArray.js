const punctuationStripper = require('./punctuationStripper')

module.exports = (item) => {
  const currentSource = dataLookUp[item.sourceSystem.toLowerCase()]
  return Object.entries(currentSource).map(([id, data]) => {
    if (data.processor) {
      return {
        label: data.label,
        type: data.type,
        urlField: data.urlField,
        value: data.processor(item, id),
      }
    }

    return false
  }).filter(item => item.value)
}

const genericFind = (item, id) => {
  if (id in item && item[id]) {
    let data = item[id]
    if (!Array.isArray(data)) {
      data = [punctuationStripper(data)]
    }
    return data
  }

  return false
}

const genericArrayFind = (item, id) => {
  if (id in item && item[id]) {
    return item[id].map((row) => row.display)
  }

  return false
}

const listAll = (item, id) => {
  if (id in item && item[id]) {
    let renderedList = ''
    Object.values(item[id]).forEach(val => {
      if (val !== '') {
        renderedList += (renderedList !== '' ? ', ' + val : val)
      }
    })
    return (renderedList === '' ? false : [renderedList])
  }
  return false
}

// eslint-disable-next-line complexity
const findProvider = (item) => {
  if (!('repository' in item)) {
    return false
  }

  switch (item.repository.toLowerCase()) {
    case 'rare':
    case 'curate':
      return ['Rare Books & Special Collections, Hesburgh Libraries, University of Notre Dame']
    case 'museum':
      return ['Snite Museum of Art']
    case 'unda':
      return ['University of Notre Dame Archives, Hesburgh Libraries, University of Notre Dame']
    case 'hesb':
      return ['General Collection, Hesburgh Libraries']
    default:
      return false
  }
}

// eslint-disable-next-line complexity
const findContact = (item) => {
  if (!('repository' in item)) {
    return false
  }
  let contact = ''
  switch (item.repository.toLowerCase()) {
    case 'rare':
    case 'curate':
      contact = 'rarebook@nd.edu'
      break
    case 'museum':
      contact = 'sniteart@nd.edu'
      break
    case 'unda':
      contact = 'archives@nd.edu'
      break
    case 'hesb':
      contact = 'asklib@nd.edu'
      break
    default:
      contact = ''
      break
  }
  if (contact === '') {
    return false
  }
  const provider = findProvider(item)
  return [`Our collection information is a work in progress and may be updated as new research findings emerge. If you have spotted an error, please contact ${provider} at [${contact}](mailto:${contact}).`]
}

// eslint-disable-next-line complexity
const getUriValue = (item) => {
  if (!('repository' in item)) {
    return false
  }
  let uriValue = ''
  switch (item.repository.toLowerCase()) {
    case 'rare':
    case 'curate':
      uriValue = 'Rare%20Books%20%26%20Special%20Collections'
      break
    case 'museum':
      uriValue = 'Snite%20Museum%20of%20Art'
      break
    case 'unda':
      uriValue = 'University%20Archives'
      break
    case 'hesb':
      uriValue = 'General%20Collection%2C%20Hesburgh%20Libraries'
      break
    default:
      uriValue = ''
      break
  }
  if (uriValue === '') {
    return false
  }
  return [uriValue]
}

const dataLookUp = {
  archivesspace: {
    creators: {
      label: 'Creator',
      type: 'searchList',
      processor: genericArrayFind,
      urlField: 'creator',
    },
    createdDate: {
      label: 'Date',
      type: 'list',
      processor: genericFind,
    },
    workType: {
      label: 'Material Type',
      type: 'searchList',
      processor: genericFind,
      urlField: 'format',
    },
    format: {
      label: 'Genre/Physical Characteristic',
      type: 'list',
      processor: genericFind,
    },
    dimensions: {
      label: 'Dimensions',
      type: 'list',
      processor: genericFind,
    },
    languages: {
      label: 'Language',
      type: 'searchList',
      processor: genericArrayFind,
      urlField: 'language',
    },
    uniqueIdentifier: {
      label: 'Identifier',
      type: 'list',
      processor: genericFind,
    },
    repository: {
      label: 'Campus Location',
      type: 'list',
      processor: findProvider,
    },
    uriValue: {
      label: 'URI Value',
      type: 'markdown',
      processor: getUriValue,
    },
    access: {
      label: 'Conditions Governing Access',
      type: 'list',
      processor: genericFind,
    },
    copyrightStatus: {
      label: 'Copyright Status',
      type: 'list',
      processor: genericFind,
    },
    copyrightStatement: {
      label: 'Conditions Governing Use',
      type: 'list',
      processor: genericFind,
    },
    dedication: {
      label: 'Immediate Source of Acquisition',
      type: 'list',
      processor: genericFind,
    },
    subjects: {
      label: 'Subject',
      type: 'searchList',
      processor: genericArrayFind,
      urlField: 'keywords',
    },
    linkToSource: {
      label: 'Link to Finding Aid',
      type: 'markdown',
      processor: genericFind,
    },
    departmentContact: {
      label: 'Contact Us',
      type: 'markdown',
      processor: findContact,
    },
  },
  aleph: {
    creators: {
      label: 'Creator',
      type: 'searchList',
      processor: genericArrayFind,
      urlField: 'creator',
    },
    contributors: {
      label: 'Contributor',
      type: 'searchList',
      processor: genericArrayFind,
      urlField: 'creator',
    },
    collections: {
      label: 'Collection',
      type: 'searchList',
      processor: genericArrayFind,
      urlField: 'collection',
    },
    createdDate: {
      label: 'Date',
      type: 'list',
      processor: genericFind,
    },
    publishers: {
      label: 'Publisher',
      type: 'list',
      processor: genericArrayFind,
    },
    workType: {
      label: 'Material Type',
      type: 'searchList',
      processor: genericFind,
      urlField: 'format',
    },
    format: {
      label: 'Genre/Physical Characteristic',
      type: 'list',
      processor: genericFind,
    },
    dimensions: {
      label: 'Dimensions',
      type: 'list',
      processor: genericFind,
    },
    languages: {
      label: 'Language',
      type: 'searchList',
      processor: genericArrayFind,
      urlField: 'language',
    },
    uniqueIdentifier: {
      label: 'Identifier',
      type: 'list',
      processor: genericFind,
    },
    repository: {
      label: 'Campus Location',
      type: 'list',
      processor: findProvider,
    },
    uriValue: {
      label: 'URI Value',
      type: 'markdown',
      processor: getUriValue,
    },
    access: {
      label: 'Conditions Governing Access',
      type: 'list',
      processor: genericFind,
    },
    copyrightStatus: {
      label: 'Copyright Status',
      type: 'list',
      processor: genericFind,
    },
    copyrightStatement: {
      label: 'Conditions Governing Use',
      type: 'list',
      processor: genericFind,
    },
    dedication: {
      label: 'Immediate Source of Acquisition',
      type: 'list',
      processor: genericFind,
    },
    subjects: {
      label: 'Subject',
      type: 'searchList',
      processor: genericArrayFind,
      urlField: 'keywords',
    },
    linkToSource: {
      label: 'Link to Library Catalog',
      type: 'markdown',
      processor: genericFind,
    },
    departmentContact: {
      label: 'Contact Us',
      type: 'markdown',
      processor: findContact,
    },
  },
  embark: {
    creators: {
      label: 'Creator',
      type: 'searchList',
      processor: genericArrayFind,
      urlField: 'creator',
    },
    createdDate: {
      label: 'Date',
      type: 'list',
      processor: genericFind,
    },
    workType: {
      label: 'Work Type',
      type: 'searchList',
      processor: genericFind,
      urlField: 'format',
    },
    format: {
      label: 'Format',
      type: 'list',
      processor: genericFind,
    },
    medium: {
      label: 'Medium',
      type: 'list',
      processor: genericFind,
    },
    dimensions: {
      label: 'Dimensions',
      type: 'list',
      processor: genericFind,
    },
    dedication: {
      label: 'Credit Line',
      type: 'list',
      processor: genericFind,
    },
    creationPlace: {
      label: 'Related Location',
      type: 'list',
      processor: listAll,
    },
    uniqueIdentifier: {
      label: 'Accession Number',
      type: 'list',
      processor: genericFind,
    },
    repository: {
      label: 'Campus Location',
      type: 'list',
      processor: findProvider,
    },
    uriValue: {
      label: 'URI Value',
      type: 'markdown',
      processor: getUriValue,
    },
    access: {
      label: 'Access',
      type: 'markdown',
      processor: genericFind,
    },
    copyrightStatus: {
      label: 'Copyright Status',
      type: 'list',
      processor: genericFind,
    },
    copyrightStatement: {
      label: 'Copyright Statement',
      type: 'list',
      processor: genericFind,
    },
    subjects: {
      label: 'Subject',
      type: 'searchList',
      processor: genericArrayFind,
      urlField: 'keywords',
    },
    departmentContact: {
      label: 'Contact Us',
      type: 'markdown',
      processor: findContact,
    },
  },
  curate: {
    creators: {
      label: 'Creator',
      type: 'searchList',
      processor: genericArrayFind,
      urlField: 'creator',
    },
    contributors: {
      label: 'Contributor',
      type: 'searchList',
      processor: genericArrayFind,
      urlField: 'creator',
    },
    createdDate: {
      label: 'Date',
      type: 'list',
      processor: genericFind,
    },
    publishers: {
      label: 'Publisher',
      type: 'list',
      processor: genericArrayFind,
    },
    workType: {
      label: 'Material Type',
      type: 'searchList',
      processor: genericFind,
      urlField: 'format',
    },
    format: {
      label: 'Genre/Physical Characteristic',
      type: 'list',
      processor: genericFind,
    },
    dimensions: {
      label: 'Dimensions',
      type: 'list',
      processor: genericFind,
    },
    languages: {
      label: 'Language',
      type: 'searchList',
      processor: genericArrayFind,
      urlField: 'language',
    },
    uniqueIdentifier: {
      label: 'Identifier',
      type: 'list',
      processor: genericFind,
    },
    repository: {
      label: 'Campus Location',
      type: 'list',
      processor: findProvider,
    },
    uriValue: {
      label: 'URI Value',
      type: 'markdown',
      processor: getUriValue,
    },
    access: {
      label: 'Conditions Governing Access',
      type: 'list',
      processor: genericFind,
    },
    copyrightStatus: {
      label: 'Copyright Status',
      type: 'list',
      processor: genericFind,
    },
    copyrightStatement: {
      label: 'Conditions Governing Use',
      type: 'list',
      processor: genericFind,
    },
    dedication: {
      label: 'Immediate Source of Acquisition',
      type: 'list',
      processor: genericFind,
    },
    subjects: {
      label: 'Subject',
      type: 'searchList',
      processor: genericArrayFind,
      urlField: 'keywords',
    },
    linkToSource: {
      label: 'Link to Finding Aid',
      type: 'markdown',
      processor: genericFind,
    },
    departmentContact: {
      label: 'Contact Us',
      type: 'markdown',
      processor: findContact,
    },
  },
}
