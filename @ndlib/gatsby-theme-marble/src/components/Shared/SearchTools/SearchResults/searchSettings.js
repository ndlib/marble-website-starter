module.exports = {
  sourceFilter: [
    'allMetadata',
    'creator',
    'date',
    'identifier',
    'collection',
    'name',
    'thumbnail',
    'type',
    'url',
  ],
  highlightFields: [
    'allMetadata.folded',
    'name.folded',
    'creator.folded',
    'collection.folded',
    'identifier.idMatch', // remove this to remove expanded tags
  ],
}
