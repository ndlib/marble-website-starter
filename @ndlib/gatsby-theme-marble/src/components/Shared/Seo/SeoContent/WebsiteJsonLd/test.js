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
})
