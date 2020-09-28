const path = require('path')
const punctuationStripper = require(path.join(__dirname, 'punctuationStripper'))

module.exports = (standardJson) => {
  const currentSource = dataLookUp[standardJson.sourceSystem.toLowerCase()]
  return Object.entries(currentSource).map(([id, data]) => {
    if (data.processor) {
      return {
        label: data.label,
        type: data.type,
        urlField: data.urlField,
        value: data.processor(standardJson, id),
      }
    }

    return false
  }).filter(item => item.value)
}

const genericFind = (standardJson, id) => {
  if (id in standardJson && standardJson[id]) {
    let data = standardJson[id]
    if (!Array.isArray(data)) {
      data = [punctuationStripper(data)]
    }
    return data
  }

  return false
}

const findCreators = (standardJson) => {
  if ('creators' in standardJson && standardJson.creators) {
    try {
      return standardJson.creators.map((creator) => creator.display)
    } catch (e) {
      return []
    }
  }
  return false
}

const findContributors = (standardJson) => {
  if ('contributors' in standardJson && standardJson.contributors) {
    try {
      return standardJson.contributors.map((creator) => creator.display)
    } catch (e) {
      return []
    }
  }
  return false
}

const findSubjects = (standardJson) => {
  if ('subjects' in standardJson && standardJson.subjects) {
    return standardJson.subjects.map((subject) => subject.display)
  }
  return false
}

const findPublisher = (standardJson) => {
  if ('publisher' in standardJson && standardJson.publisher) {
    return standardJson.publisher.map((publisher) => publisher.display)
  }
  return false
}

const mappedLanguageCodes = (standardJson) => {
  if (standardJson.languages) {
    return standardJson.languages.map((language) => language.display)
  }
  return false
}

const findProvider = (standardJson) => {
  if (!('repository' in standardJson)) {
    return false
  }

  switch (standardJson.repository.toLowerCase()) {
    case 'rare':
    case 'curate':
      return ['Rare Books and Special Collections, Hesburgh Libraries, University of Notre Dame']
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

const findContact = (standardJson) => {
  if (!('repository' in standardJson)) {
    return false
  }
  let contact = ''
  switch (standardJson.repository.toLowerCase()) {
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
  const provider = findProvider(standardJson)
  return [`Our collection information is a work in progress and may be updated as new research findings emerge. If you have spotted an error, please contact ${provider} at [${contact}](mailto:${contact}).`]
}

const dataLookUp = {
  archivesspace: {
    creators: {
      label: 'Creator',
      type: 'searchList',
      processor: findCreators,
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
      type: 'list',
      processor: mappedLanguageCodes,
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
      processor: findSubjects,
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
      processor: findCreators,
      urlField: 'creator',
    },
    contributors: {
      label: 'Contributor',
      type: 'searchList',
      processor: findContributors,
      urlField: 'creator',
    },
    collections: {
      label: 'Collection',
      type: 'searchList',
      processor: genericFind,
      urlField: 'collection',
    },
    createdDate: {
      label: 'Date',
      type: 'list',
      processor: genericFind,
    },
    publisher: {
      label: 'Publisher',
      type: 'list',
      processor: findPublisher,
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
      type: 'list',
      processor: mappedLanguageCodes,
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
      processor: findSubjects,
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
      processor: findCreators,
      urlField: 'creator',
    },
    createdDate: {
      label: 'Date',
      type: 'list',
      processor: genericFind,
    },
    workType: {
      label: 'Classification',
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
    access: {
      label: 'Access',
      type: 'list',
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
      processor: findSubjects,
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
      processor: findCreators,
      urlField: 'creator',
    },
    contributors: {
      label: 'Contributor',
      type: 'searchList',
      processor: findContributors,
      urlField: 'creator',
    },
    createdDate: {
      label: 'Date',
      type: 'list',
      processor: genericFind,
    },
    publisher: {
      label: 'Publisher',
      type: 'list',
      processor: findPublisher,
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
      type: 'list',
      processor: mappedLanguageCodes,
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
      processor: findSubjects,
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
