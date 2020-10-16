module.exports = {
  sourceFilter: [
    'allMetadata',
    'creator',
    'date',
    'identifier',
    'name',
    'thumbnail',
    'type',
    'url',
  ],
  highlightFields: [
    'allMetadata.folded',
    'name.folded',
    'creator.folded',
    'identifier.idMatch',
  ],
}
