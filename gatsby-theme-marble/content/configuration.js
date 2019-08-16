module.exports = {

  // layouts
  layouts: {
    default: [
      { component: 'MarkdownHtmlContent' },
    ],
    collection: [
      { component: 'ActionButtons' },
      { component: 'ManifestDescription' },
      { component: 'ManifestMetaData' },
      { component: 'ChildManifests' },
    ],
    item: [
      {
        component: 'MultiColumn',
        components: [
          {
            component: 'Column',
            components: [
              { component: 'ActionButtons' },
              { component: 'MiradorViewer' },
            ],
          },
          {
            component: 'Column',
            components: [
              { component: 'ManifestDescription' },
              { component: 'ManifestMetaData' },
            ],
          },
        ],
      },
    ],
    test: [{ component: 'TestComponent' }],
  },
}
