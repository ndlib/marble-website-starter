const React = require('react')
const plugin = jest.requireActual('gatsby-plugin-next-seo')

module.exports = {
  ...plugin,
  JsonLd: jest.fn().mockImplementation(
    () => null
  )
}
