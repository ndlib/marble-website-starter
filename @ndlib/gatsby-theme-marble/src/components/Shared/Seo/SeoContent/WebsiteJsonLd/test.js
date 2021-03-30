import React from 'react'
import renderer from 'react-test-renderer'
import WebsiteJsonLd from './'

describe('WebsiteJsonLd component', () => {

  it('renders props into values', () => {
    const tree = renderer
      .create(<WebsiteJsonLd pathname='/' siteUrl='https://marble.nd.edu' />)
      .toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('renders on homepage', () => {
    const tree = renderer.create(<WebsiteJsonLd pathname='/some/other' siteUrl='https://marble.nd.edu' />)
    expect(tree.toJSON()).toBe(null)
  })
})
