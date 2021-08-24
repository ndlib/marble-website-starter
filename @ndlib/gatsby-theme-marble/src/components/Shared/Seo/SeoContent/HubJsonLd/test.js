import React from 'react'
import renderer from 'react-test-renderer'
import HubJsonLd from './'

describe('HubJsonLd component', () => {
  it('renders props into values', () => {
    const tree = renderer
      .create(<HubJsonLd
        pathname={'/featured/posters'}
        title={'1984'}
        image={'http://fake.io/image'}
        thumbnail={'http://fake.io/thumbnail'}
        url={'http://object.io/page'}
        date={'Present'}
        description={'Dystopian nightmare'}
        language={'Newspeak'}
      />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
