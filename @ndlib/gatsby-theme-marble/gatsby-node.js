const fs = require('fs')

exports.onCreateWebpackConfig = ({ actions, stage, loaders, plugins }) => {
  if (stage === 'build-html' || stage === 'develop-html') {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /okta-auth-js/,
            use: loaders.null(),
          },
        ],
      },
    })
  } else if (stage === 'build-javascript' || stage === 'develop') {
    actions.setWebpackConfig({
      plugins: [
        plugins.provide({ process: 'process/browser' }), // keep in theme even if okta related things move to marble-web
        plugins.provide({ Buffer: ['buffer', 'Buffer'] }),
      ],
    })
  }
  actions.setWebpackConfig({
    resolve: {
      alias: {
        crypto: require.resolve('crypto-browserify'),
        stream: require.resolve('stream-browserify'),
        buffer: require.resolve('buffer'),
        path: require.resolve('path-browserify'), // keep in theme even if okta related things move to marble-web
      },
      fallback: {
        fs: false,
      },
    },
  })
}

// Make sure the data directory exists
exports.onPreBootstrap = ({ reporter }, options) => {
  const contentPath = options.contentPath || 'content'
  if (!fs.existsSync(contentPath)) {
    reporter.info(`creating the ${contentPath} directory`)
    fs.mkdirSync(contentPath)
  }
}

exports.sourceNodes = async (gatsbyInternal, pluginOptions) => {
  const { iiifViewerUrl, searchUrl, searchIndex } = pluginOptions
  const { actions, createContentDigest, createNodeId } = gatsbyInternal
  const { createNode } = actions
  const marbleConfiguration = {
    id: createNodeId('1'),
    iiifViewerUrl: iiifViewerUrl,
    search: {
      url: searchUrl,
      index: searchIndex,
    },
  }
  const nodeContent = JSON.stringify(marbleConfiguration)
  const normalizedTypeNode = {
    ...marbleConfiguration,
    internal: {
      type: 'MarbleConfiguration',
      content: nodeContent,
      contentDigest: createContentDigest(marbleConfiguration),
    },
  }
  await createNode(normalizedTypeNode)
}

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

// predefine stuff we expect from configuration.js
exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  const typeDefs = `
  # things expected to be there
  type menuItems @dontInfer {
    id: String
    label: String
    link: String
    icon: String
    selectedPatterns: [String]
  }
  type MenusJson implements Node @dontInfer {
    id: String
    label: String
    items: [menuItems]
  }
  type languages @dontInfer {
    default: String
    allowed: [String]
  }
  type searchConfig @dontInfer {
    index: String
    url: String
  }
  type MarbleConfiguration implements Node {
    iiifViewerUrl: String
    search: searchConfig
  }
  `
  createTypes(typeDefs)
}
