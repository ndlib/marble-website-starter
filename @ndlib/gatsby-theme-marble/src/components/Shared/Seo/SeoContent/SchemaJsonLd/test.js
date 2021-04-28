import React from 'react'
import renderer from 'react-test-renderer'
import SchemaJsonLd from './'

describe('SchemaJsonLd component', () => {

  it('renders props into values', () => {
    const tree = renderer
      .create(<SchemaJsonLd
        title={'Fake Title'}
        description={'This is a fake description'}
        image={'http://fake.io/image'}
        author={'Fake Author'}
        creditText={'Fake Creditor'}
        dimensions={'2 x 4'}
        thumbnail={'http://fake.io/thumbnail'} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
