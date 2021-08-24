import React from 'react'
import renderer from 'react-test-renderer'

import Voiceover from './'

test('Voiceover', () => {
  const tree = renderer
    .create(<Voiceover text='Test' />)
    .toJSON()
  expect(tree).toMatchSnapshot()
})
