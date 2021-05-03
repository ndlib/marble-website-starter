module.exports = async (client) => {
  const settings = {
    index: {
      number_of_shards: 1,
    },
    analysis: {
      filter: {
        english_stop: {
          type:       'stop',
          stopwords:  '_english_',
        },
      },
      char_filter: {
        // this is used for the id filters people do not always know the punctuation
        // in the id and sometimes do not know the leading zeros
        // we are removing all the characters people do not always know for the test.
        specialCharactersFilter: {
          pattern: '[^A-Za-z1-9]',
          type: 'pattern_replace',
          replacement: '',
        },
      },
      analyzer: {
        folded_analyzer: {
          tokenizer: 'standard',
          stopwords: '_english_',
          filter: [
            'lowercase',
            'asciifolding',
            'stemmer',
            'english_stop',
          ],
        },
        stopword_analyzer: {
          tokenizer: 'standard',
          filter: [
            'english_stop',
            'stemmer',
          ],
        },
        no_punctuation_keyword: {
          tokenizer: 'keyword',
          char_filter: [
            'specialCharactersFilter',
          ],
          filter: [
            'lowercase',
            'trim',
          ],
        },
      },
    },
  }
  let nodeInfo = await client.cluster.health().catch((e) => {
    console.log(e)
    nodeInfo = { number_of_nodes: 1 }
  })
  if (nodeInfo.number_of_nodes > 1) {
    settings.index.number_of_replicas = 1
  } else {
    settings.index.number_of_replicas = 0
  }
  return settings
}
