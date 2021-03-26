import React from 'react'
import renderer from 'react-test-renderer'
import WebsiteJsonLd from './'
import { JsonLd } from 'gatsby-plugin-next-seo'

describe('WebsiteJsonLd component', () => {

  it('renders props into values', () => {
    const tree = renderer.create(<WebsiteJsonLd pathname='/' siteUrl='https://marble.nd.edu' />)
    const testInstance = tree.root

    expect(testInstance.findByType(JsonLd).props.url).toBe('https://marble.nd.edu')
    expect(testInstance.findByType(JsonLd).props.context).toBe('https://schema.org')
    expect(testInstance.findByType(JsonLd).props.potentialAction.target).toBe('https://marble.nd.edu/search?q={search_term_string}')
    expect(testInstance.findByType(JsonLd).props.potentialAction.type).toBe('SearchAction')
    expect(testInstance.findByType(JsonLd).props.potentialAction.query-input).toBe('required name=search_term_string')
  })

  it('renders on homepage', () => {
    const tree = renderer.create(<WebsiteJsonLd pathname='/some/other' siteUrl='https://marble.nd.edu' />)
    expect(tree.toJSON()).toBe(null)
  })
})
