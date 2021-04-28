import React from 'react'
import renderer from 'react-test-renderer'
import SchemaJsonLd from './'

describe('SchemaJsonLd component', () => {

  it('renders props into values', () => {
    const tree = renderer
      .create(<SchemaJsonLd
        title={'1984'}
        image={'http://fake.io/image'}
        author={'George Orwell'}
        dimensions={'2 x 4'}
        thumbnail={'http://fake.io/thumbnail'}
        url={'http://object.io/page'}
        relatedLocation={'London'}
        date={'Present'}
        description={'Dystopian nightmare'}
        language={'Newspeak'}
        keywords={'totalitarian', 'society', 'thoughtcrime', 'doublespeak'}
        physicalCharacteristic={'8in x 6in'}
        classification={'Book'}
        materialType={'Paper'}
        creditText={'BBC'}
        copyrightStatus={'Public Domain'}
        publisher={'BBC'}
        identifier={'2+2=5'}
        acquisition={'a gift from me'}
        campusLocation={'library'}
      />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
