module.exports = {
  default: [
    { component: 'MarkdownHtmlContent' },
  ],
  browseSearchPage: [
    { component: 'MarkdownHtmlContent' },
    {
      component: 'SearchBase',
      components: [
        { component: 'SearchFilterBox' },
        { component: 'SearchSortingSelector' },
        {
          component: 'MultiColumn',
          props: [{ label: 'columns', value: '4' }],
          components: [
            {
              component: 'Column',
              components: [
                {
                  component: 'SearchRefinementListFilter',
                  props: [
                    { label: 'field', value: 'centuryTag.keyword' },
                    { label: 'label', value: 'Timeperiod' },
                    { label: 'operator', value: 'OR' },
                  ],
                },
                {
                  component: 'SearchRefinementListFilter',
                  props: [
                    { label: 'field', value: 'repository.keyword' },
                    { label: 'label', value: 'Repository' },
                    { label: 'operator', value: 'OR' },
                  ],
                },
                {
                  component: 'SearchRefinementListFilter',
                  props: [
                    { label: 'field', value: 'language.keyword' },
                    { label: 'label', value: 'Language' },
                    { label: 'operator', value: 'OR' },
                  ],
                },
                {
                  component: 'SearchRefinementListFilter',
                  props: [
                    { label: 'field', value: 'continentTag.keyword' },
                    { label: 'label', value: 'Place' },
                    { label: 'operator', value: 'OR' },
                  ],
                },
                {
                  component: 'SearchRefinementListFilter',
                  props: [
                    { label: 'field', value: 'themeTag.keyword' },
                    { label: 'label', value: 'Theme' },
                    { label: 'operator', value: 'OR' },
                  ],
                },
              ],
            },
            {
              component: 'Column',
              props: [{ label: 'colSpan', value: '3' }],
              components: [
                {
                  component: 'SearchResults',
                  props: [{ label: 'defaultDisplay', value: 'grid' }],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  markdownWithMenu: [
    {
      component: 'MultiColumn',
      props: [{ label: 'columns', value: '5' }],
      components: [
        {
          component: 'Column',
          components: [
            {
              component: 'Menu',
              props: [{ label: 'navClass', value: 'verticalMenu' }],
            },
          ],
        },
        {
          component: 'Column',
          props: [{ label: 'colSpan', value: '3' }],
          components: [
            { component: 'MarkdownHtmlContent' },
          ],
        },
      ],
    },
  ],
  collection: [
    { component: 'ActionButtons' },
    { component: 'ManifestDescription' },
    { component: 'ManifestMetaData' },
    { component: 'ChildManifests' },
  ],
  item: [
    { component: 'MarkdownHtmlContent' },
    { component: 'ManifestDescription' },
    { component: 'MiradorViewer' },
    { component: 'ActionButtons' },
    { component: 'ManifestMetaData' },
  ],
}
