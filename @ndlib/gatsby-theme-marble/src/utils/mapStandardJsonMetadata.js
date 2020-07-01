
module.exports = (standardJson) => {
  return {
    title: standardJson.title,
    description: mapFieldOrBlank(standardJson, 'description'),
    annotation: 'comes from another source system or user entered',
    //    display: ndJson.level,
    //    iiifUri: ndJson.iiifUri,
    copyrightRestricted: false,
    partiallyDigitized: true,
    //    image: buildImageFields(ndJson),
    //    allImages: buildAllImages(ndJson),
    metadata: [
      {
        label: 'Artist',
        value: 'Señor Senior, Sr.',
        type: 'artist',
      },
      {
        label: 'field 1',
        value: 'value 1',
        type: '',
      },
      {
        label: 'field 2',
        value: 'value 2',
        type: '',
      },
    ],
  //  seeAlso: buildSeeAlso(ndJson),
  }
}

const mapFieldOrBlank = (standardJson, field) => {
  if (field in standardJson) {
    return standardJson[field]
  }

  return ''
}
