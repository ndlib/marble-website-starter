filemaker = require("./fm2.js")

exports.sourceNodes = async ({ actions, createNodeId, createContentDigest }, pluginOptions) => {
    const { createNode } = actions
    fm = new filemaker()
    await fm.login()
    console.log(
      `logging: "${pluginOptions.message}" to the console`
    )
    // Data can come from anywhere, but for now create it manually
    const myData = {
      key: 123,
      foo: `The foo field of my node`,
      bar: `Baz`,
    }
  
    const nodeContent = JSON.stringify(myData)
  
    const nodeMeta = {
      id: createNodeId(`my-data-${myData.key}`),
      parent: null,
      children: [],
      internal: {
        type: `MyNodeType`,
        mediaType: `text/html`,
        content: nodeContent,
        contentDigest: createContentDigest(myData),
      },
    }
  
    const node = Object.assign({}, myData, nodeMeta)
    createNode(node)
  }
  