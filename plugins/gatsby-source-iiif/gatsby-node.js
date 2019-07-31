exports.sourceNodes = async (
  { actions }
) => {
  const { createTypes } = actions

  const typeDefs = `
    type iiifTranslatedString {
      en: [ String ]
      en_GB: [ String ]
      en_US: [ String ]
      fr: [ String ]
      none: [ String ]
    }

    type iiifLabeledString {
      label: iiifTranslatedString
      value: iiifTranslatedString
    }

    type iiifServiceJson {
      id: String
      _context: String
      profile: String
    }

    type iiifThumbnailJson {
      id: String
      type: String
      format: String
      service: [iiifServiceJson]
    }

    type iiifLogoJson {
      id: String
      type: String
      height: Int
      weight: Int
      format: String
    }

    type iiifHomepage {
      id: String
      type: String
      label: iiifTranslatedString
      format: String
    }

    type iiifSeeAlso {
      id: String
      type: String
      format: String
      profile: String
    }

    type iiifProviderJson {
      id: String
      type: String
      label: String
      homepage: [ iiifHomepage ]
      logo: [ iiifLogoJson ]
      seeAlso: [ iiifSeeAlso ]
    }

    type iiifItemAnnotationPageBody {
      id: String
      type: String
      format: String
      width: Int
      height: Int
      service: iiifServiceJson
    }

    type iiifItem {
      id: ID!
      type: String
      label: iiifTranslatedString
      height: Int
      width: Int
      summary: iiifTranslatedString
      requiredStatement: iiifLabeledString
      provider: iiifProviderJson
      rights: String
      viewingDirection: String
      service: iiifServiceJson
      motivation: String
      target: String
      body: iiifItemAnnotationPageBody
      seeAlso: [ iiifSeeAlso ]
      metadata: [iiifLabeledString]
      thumbnail: [iiifThumbnailJson]
      items: [iiifItem]
    }

    type IiifJson implements Node {
      # However Node fields are optional and you don't have to add them
      id: ID!
      _context: String
      type: String!
      slug: String!
      label: iiifTranslatedString!
      summary: iiifTranslatedString
      requiredStatement: iiifLabeledString
      provider: iiifProviderJson
      rights: String
      viewingDirection: String
      metadata: [iiifLabeledString]
      thumbnail: [iiifThumbnailJson]
      items: [iiifItem]
    }`

  createTypes(typeDefs)
}
