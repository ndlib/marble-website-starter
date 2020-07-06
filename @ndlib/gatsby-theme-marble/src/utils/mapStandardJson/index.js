const imageMetadata = require('./imageMetadata')

module.exports = (standardJson) => {
  return {
    title: standardJson.title,
    description: mapFieldOrDefault(standardJson, 'description', ''),
    display: standardJson.level.toLowerCase(),
    iiifUri: mapFieldOrDefault(standardJson, 'iiifUri', ''),
    copyrightRestricted: false,
    partiallyDigitized: mapFieldOrDefault(standardJson, 'partiallyDigitized', false),
    //    image: buildImageFields(ndJson),
    allImages: imageMetadata(standardJson),
    metadata: makeMetadataArray(standardJson),
  //  seeAlso: buildSeeAlso(ndJson),
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
  if (id in standardJson) {
    let data = standardJson[id]
    if (!Array.isArray(data)) {
      data = [data]
    }
    return data
  }

  return false
}

const findCreators = (standardJson) => {
  if ('creators' in standardJson) {
    return standardJson.creators.map((creator) => creator.display)
  }
  return false
}

const findSubjects = (standardJson) => {
  if ('subjects' in standardJson) {
    return standardJson.subjects.map((subject) => subject.term)
  }
  return false
}

const findPublisher = (standardJson) => {
  if ('publisher' in standardJson) {
    return [standardJson.publisher.publisherName]
  }
  return false
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
      processor: genericFind,
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
      processor: genericFind,
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
      processor: genericFind,
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
      processor: genericFind,
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
