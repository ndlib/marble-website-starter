exports.sourceNodes = async (
  { actions }
) => {
  const { createTypes } = actions

  const typeDefs = `
    type iiifTranslatedString @dontInfer {
      en: [ String ]
      en_GB: [ String ]
      en_US: [ String ]
      fr: [ String ]
      none: [ String ]
    }

    type iiifLabeledString @dontInfer {
      label: iiifTranslatedString
      value: iiifTranslatedString
    }

    type iiifServiceJson @dontInfer {
      id: String
      _context: String
      profile: String
    }

    type iiifThumbnailJson @dontInfer {
      id: String
      type: String
      format: String
      service: [iiifServiceJson]
    }

    type iiifLogoJson @dontInfer {
      id: String
      type: String
      height: Int
      weight: Int
      format: String
    }

    type iiifHomepage @dontInfer {
      id: String
      type: String
      label: iiifTranslatedString
      format: String
    }

    type iiifSeeAlso @dontInfer {
      id: String
      type: String
      format: String
      profile: String
    }

    type iiifProviderJson @dontInfer {
      id: String
      type: String
      label: String
      homepage: [ iiifHomepage ]
      logo: [ iiifLogoJson ]
      seeAlso: [ iiifSeeAlso ]
    }

    type iiifItemAnnotationPageBody @dontInfer {
      id: String
      type: String
      format: String
      width: Int
      height: Int
      service: iiifServiceJson
    }

    type iiifItem @dontInfer {
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
