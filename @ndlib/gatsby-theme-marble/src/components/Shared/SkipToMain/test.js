import React from 'react'
import renderer from 'react-test-renderer'

import SkipToMain from './'

test('SkipToMain', () => {
  const tree = renderer
    .create(<SkipToMain />)
    .toJSON()
  expect(tree).toMatchSnapshot()

  expect(tree.props.href).toEqual('#mainContent')
  expect(tree.props.className).toEqual('css-gb7gys-SkipToMain')
  expect(tree.children[0]).toEqual('Skip to main content.')
})
