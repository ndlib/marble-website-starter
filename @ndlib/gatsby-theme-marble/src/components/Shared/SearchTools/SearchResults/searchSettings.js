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
    'uniqueIdentifier',
  ],
  highlightFields: [
    'allMetadata.folded',
    'name.folded',
    'creator.folded',
    'collection.folded',
    'identifier.idMatch', // remove this to remove expanded tags
    'uniqueIdentifier.idMatch',
    'uniqueIdentifier.folded',
  ],
}
