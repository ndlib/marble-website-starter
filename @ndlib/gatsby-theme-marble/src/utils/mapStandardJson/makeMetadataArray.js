const path = require('path')
const languageCodes = require(path.join(__dirname, 'languageCodes'))

module.exports = (standardJson) => {
  const currentSource = dataLookUp[standardJson.sourceSystem.toLowerCase()]
  return Object.entries(currentSource).map(([id, data]) => {
    if (data.processor) {
      return {
        label: data.label,
        type: data.type,
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
      data = [data]
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
      console.log('map=', standardJson.creators, typeof (standardJson.creators))
      return []
    }
  }
  return false
}

const findSubjects = (standardJson) => {
  if ('subjects' in standardJson && standardJson.subjects) {
    return standardJson.subjects.map((subject) => subject.term)
  }
  return false
}

const findPublisher = (standardJson) => {
  if ('publisher' in standardJson && standardJson.publisher) {
    return [standardJson.publisher.publisherName]
  }
  return false
}

const mappedLanguageCodes = (standardJson) => {
  if (standardJson.languages) {
    return standardJson.languages.map((code) => {
      if (languageCodes[code]) {
        return languageCodes[code]
      }
      return code
    })
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
  return [`Not every record you will find here is complete. More information is available for some works than for others, and some entries have been updated more recently. If you have spotted an error or have more information about this record, please contact the ${provider} at ${contact}.`]
}

const dataLookUp = {
  archivesspace: {
    creators: {
      label: 'Creator',
      type: 'list',
      processor: findCreators,
    },
    createdDate: {
      label: 'Date',
      type: 'list',
      processor: genericFind,
    },
    workType: {
      label: 'Material Type',
      type: 'list',
      processor: genericFind,
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
      processor: genericFind,
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
      type: 'list',
      processor: findSubjects,
    },
    linkToSource: {
      label: 'Link to finding aid',
      type: 'list',
      processor: genericFind,
    },
    departmentContact: {
      label: 'Contact Us',
      type: 'list',
      processor: findContact,
    },
  },
  aleph: {
    creators: {
      label: 'Creator',
      type: 'list',
      processor: findCreators,
    },
    contributors: {
      label: 'Contributor',
      type: 'list',
      processor: findCreators,
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
      type: 'list',
      processor: genericFind,
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
      processor: genericFind,
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
      type: 'list',
      processor: findSubjects,
    },
    linkToSource: {
      label: 'Link to library catalog',
      type: 'list',
      processor: genericFind,
    },
    departmentContact: {
      label: 'Contact Us',
      type: 'list',
      processor: findContact,
    },
  },
  embark: {
    creators: {
      label: 'Creator',
      type: 'list',
      processor: findCreators,
    },
    createdDate: {
      label: 'Date',
      type: 'list',
      processor: genericFind,
    },
    workType: {
      label: 'Classification',
      type: 'list',
      processor: genericFind,
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
      label: 'Accession number',
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
      type: 'list',
      processor: findSubjects,
    },
    departmentContact: {
      label: 'Contact Us',
      type: 'list',
      processor: findContact,
    },
  },
  curate: {
    creators: {
      label: 'Creator',
      type: 'list',
      processor: findCreators,
    },
    contributors: {
      label: 'Contributor',
      type: 'list',
      processor: findCreators,
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
      type: 'list',
      processor: genericFind,
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
      processor: genericFind,
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
      type: 'list',
      processor: findSubjects,
    },
    linkToSource: {
      label: 'Link to finding aid',
      type: 'list',
      processor: genericFind,
    },
    departmentContact: {
      label: 'Contact Us',
      type: 'list',
      processor: findContact,
    },
  },
}
