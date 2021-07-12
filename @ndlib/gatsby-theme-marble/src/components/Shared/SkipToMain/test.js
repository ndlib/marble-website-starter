import React from 'react'
import renderer from 'react-test-renderer'

import SkipToMain from './'

test('SkipToMain', () => {
  const tree = renderer
    .create(<SkipToMain location={{ pathname: 'path' }} />)
    .toJSON()
  expect(tree).toMatchSnapshot()
})
