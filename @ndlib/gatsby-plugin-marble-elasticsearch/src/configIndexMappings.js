module.exports = async () => {
  const mappings = {
    properties : {
      allMetadata : {
        type: 'text',
        analyzer: 'stopword_analyzer',
        fields: {
          folded: {
            type:       'text',
            analyzer:   'folded_analyzer',
          },
        },
      },
      name: {
        type: 'text',
        analyzer: 'standard',
        fields: {
          keyword: {
            type: 'keyword',
            ignore_above: 256,
          },
          folded: {
            type:       'text',
            analyzer:   'folded_analyzer',
          },
        },
      },
      creator: {
        type: 'text',
        analyzer: 'standard',
        fields: {
          keyword: {
            type: 'keyword',
            ignore_above: 256,
          },
          folded: {
            type:       'text',
            analyzer:   'folded_analyzer',
          },
        },
      },
      collection: {
        type: 'text',
        analyzer: 'standard',
        fields: {
          keyword: {
            type: 'keyword',
            ignore_above: 256,
          },
          folded: {
            type:       'text',
            analyzer:   'folded_analyzer',
          },
        },
      },
      identifier: {
        type: 'text',
        analyzer: 'standard',
        fields: {
          idMatch: {
            type: 'text',
            analyzer: 'no_punctuation_keyword',
          },
        },
      },
      date: {
        type: 'text',
      },
    },
  }

  return mappings
}
