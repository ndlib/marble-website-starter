
module.exports = (standardJson) => {
  const slug = `item/${standardJson.id}`

  return {
    title: standardJson.title,
    slug: slug,
    description: mapFieldOrDefault(standardJson, 'description', ''),
    display: standardJson.level.toLowerCase(),
    iiifUri: mapFieldOrDefault(standardJson, 'iiifUri', ''),
    copyrightRestricted: ('copyrightStatus' in standardJson && standardJson.copyrightStatus.toLowerCase() === 'copyright'),
    partiallyDigitized: mapFieldOrDefault(standardJson, 'partiallyDigitized', false),
    sequence: standardJson.sequence,
    citation: '',
    metadata: makeMetadataArray(standardJson),
  }
}

const mapFieldOrDefault = (standardJson, field, defaultValue) => {
  if (field in standardJson) {
    return standardJson[field]
  }

  return defaultValue
}

const makeMetadataArray = (standardJson) => {
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
      label: 'Link to finding aid',
      type: 'list',
      processor: genericFind,
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
  },
}
