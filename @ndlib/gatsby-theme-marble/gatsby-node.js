const fs = require('fs')
const crypto = require('crypto')
const { attachFields } = require('gatsby-plugin-node-fields')
const merge = require('lodash.merge')
// Make sure the data directory exists
exports.onPreBootstrap = ({ reporter }, options) => {
  const contentPath = options.contentPath || 'content'
  if (!fs.existsSync(contentPath)) {
    reporter.info(`creating the ${contentPath} directory`)
    fs.mkdirSync(contentPath)
  }
}
// predefine stuff we expect from configuration.js
exports.sourceNodes = ({ actions }) => {
  const { createTypes } = actions

  const typeDefs = `
  # iiif stuff
  type iiifTranslatedString @dontInfer {
    en: [ String ]
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
    label: iiifTranslatedString
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
    service: [iiifServiceJson]
  }

  type iiifItem @dontInfer {
    id: ID!
    type: String
    label: iiifTranslatedString
    height: Int
    width: Int
    summary: iiifTranslatedString
    requiredStatement: iiifLabeledString
    provider: [iiifProviderJson]
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

  type IiifJson implements Node @dontInfer {
    # However Node fields are optional and you don't have to add them
    id: ID!
    _context: String
    type: String!
    slug: String!
    label: iiifTranslatedString!
    summary: iiifTranslatedString
    requiredStatement: iiifLabeledString
    provider: [iiifProviderJson]
    rights: String
    viewingDirection: String
    metadata: [iiifLabeledString]
    thumbnail: [iiifThumbnailJson]
    items: [iiifItem]
    partiallyDigitized: String
    seeAlso: [iiifSeeAlso]
  }

  #react component stuff
  type prop @dontInfer {
    label: String
    value: String
    fileValue: File
  }

  type component {
    component: String
    props: [prop]
    components: [component]
  }

  type customFrontmatter {
    author: String
    components: [component]
    description: String
    defaultSearch: [defaultSearch]
    layout: String
    menu: String
    slug: String
    title: String
    iiifJson: IiifJson
  }

  type RemarkMarblePage implements Node {
    frontmatter: customFrontmatter
    fields: customFrontmatter
  }


  # things expected to be there
  type searchBase @dontInfer {
    app: String
    url: String
  }
  type menuItems @dontInfer {
    id: String
    label: String
    link: String
  }
  type menus @dontInfer {
    id: String
    label: String
    items: [menuItems]
  }
  type defaultSearch @dontInfer {
    tag: String
  }
  type languages @dontInfer {
    default: String
    allowed: [String]
  }
  type authClient @dontInfer {
    url: String
    clientId: String
    issuer: String
  }
  type SiteMetadata @dontInfer {
    universalViewerBaseURL: String
    googleMapApiURL: String
    iiifHelpURL: String
    searchBase: searchBase
    footerText: String
    menus: [menus]
    hideLogo: Boolean
    useLogin: Boolean
    userContentPath: String
    authClient: authClient
    searchPath: String
    languages: languages
  }
  type Site implements Node {
    siteMetadata: SiteMetadata
  }
  `
  createTypes(typeDefs)
}

// exports.createResolvers = ({ createResolvers }, options) => {
//   const basePath = options.basePath || '/'
//   createResolvers({})
// }

exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions

  if (page.path.match(/^\/user/)) {
    page.matchPath = '/user/*'
    // Update the page.
    createPage(page)
  } else if (page.path.match(/^\/myportfolio/)) {
    page.matchPath = '/myportfolio/*'
    // Update the page.
    createPage(page)
  }
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return graphql(`
    {
      allRemarkMarblePage {
        nodes {
          frontmatter{
            slug
            iiifJson {
              id
            }
          }
        }
      }
    }
  `).then(result => {
    const pages = result.data.allRemarkMarblePage.nodes

    pages.forEach(node => {
      const pagePath = node.frontmatter.slug === 'index' ? '/' : node.frontmatter.slug
      createPage({
        path: pagePath,
        component: require.resolve('./src/templates/markdownTemplate.js'),
        context: {
          // Data passed to context is available
          // in page queries as GraphQL variables.
          slug: node.frontmatter.slug,
        },
      })
    })
    pages.forEach(node => {
      if (node.frontmatter.iiifJson) {
        createPage({
          path: `${node.frontmatter.slug}/mirador`,
          component: require.resolve('./src/templates/miradorTemplate.js'),
          context: {
            slug: node.frontmatter.slug,
          },
        })
      }
    })
  })
}

exports.onCreateNode = ({ node, actions, createNodeId }, options) => {
  const { createNode } = actions
  if (node.internal.type === 'MarkdownRemark') {
    const fieldData = {
      frontmatter: node.frontmatter,
    }
    createNode({
      ...fieldData,
      // Required fields.
      id: createNodeId(`${node.id} >>> RemarkMarblePage`),
      parent: node.id,
      children: [],
      internal: {
        type: 'RemarkMarblePage',
        contentDigest: crypto
          .createHash('md5')
          .update(JSON.stringify(fieldData))
          .digest('hex'),
        content: JSON.stringify(fieldData),
        description: 'Enhanced markdown pages with react components',
      },
    })
  }

  const descriptors = [
    {
      predicate: node => node.frontmatter,
      fields: [
        {
          name: 'components',
          getter: node => {
            return getComponents(node, options)
          },
          defaultValue: [{ component: 'MarkdownHtmlContent' }],
        },
      ],
    },
  ]
  attachFields(node, actions, descriptors)
}

const getComponents = (node, options) => {
  if (node && node.frontmatter) {
    if (node.frontmatter.components) {
      return node.frontmatter.components
    } else if (node.frontmatter.layout) {
      return getComponentsFromLayout(node.frontmatter.layout, options)
    }
  }
  return [{ component: 'MarkdownHtmlContent' }]
}

const getComponentsFromLayout = (layout, options) => {
  let availableLayouts = defaultLayouts
  if (options.layouts) {
    availableLayouts = merge({}, defaultLayouts, options.layouts)
  }
  return availableLayouts[layout] || availableLayouts.default
}

const defaultLayouts = {
  default: [
    { component: 'MarkdownHtmlContent' },
  ],
  browseSearchPage: [
    { component: 'MarkdownHtmlContent' },
    {
      component: 'SearchBase',
      components: [
        { component: 'SearchFilterBox' },
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
                    { label: 'label', value: 'Time Period' },
                    { label: 'operator', value: 'OR' },
                    { label: 'sort', value: 'a-z' },
                  ],
                },
                {
                  component: 'SearchRefinementListFilter',
                  props: [
                    { label: 'field', value: 'repository.keyword' },
                    { label: 'label', value: 'Campus Location' },
                    { label: 'operator', value: 'OR' },
                  ],
                },
                {
                  component: 'SearchRefinementListFilter',
                  props: [
                    { label: 'field', value: 'formatTag.keyword' },
                    { label: 'label', value: 'Format' },
                    { label: 'operator', value: 'OR' },
                  ],
                },
                {
                  component: 'SearchRefinementListFilter',
                  props: [
                    { label: 'field', value: 'themeTag.keyword' },
                    { label: 'label', value: 'Keywords' },
                    { label: 'size', value: '10' },
                    { label: 'sort', value: 'default' },
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
                  props: [{ label: 'defaultDisplay', value: 'list' }],
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
    { component: 'MarkdownHtmlContent' },
    {
      component: 'MultiColumn',
      props: [
        { label: 'columns', value: '5' },
      ],
      components: [
        {
          component: 'Column',
          props: [
            { label: 'colSpan', value: '2' },
          ],
          components: [
            { component: 'ActionButtons' },
            { component: 'ManifestDescription' },
            { component: 'ManifestMetaData' },
            { component: 'PartiallyDigitized' },
          ],
        },
        {
          component: 'Column',
          props: [
            { label: 'colSpan', value: '3' },
          ],
          components: [
            { component: 'ChildManifests' },
          ],
        },
      ],
    },
  ],
  item: [
    { component: 'MarkdownHtmlContent' },
    {
      component: 'MultiColumn',
      components: [
        {
          component: 'Column',
          components: [
            { component: 'ActionButtons' },
            { component: 'ManifestImageGroup' },
          ],
        },
        {
          component: 'Column',
          components: [
            { component: 'ManifestMetaData' },
            { component: 'PartiallyDigitized' },
          ],
        },
      ],
    },
    { component: 'ManifestDescription' },
  ],
}
