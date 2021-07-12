import React from 'react'
import renderer from 'react-test-renderer'

import SkipToMain from './'

test('SkipToMain', () => {
  const tree = renderer
    .create(<SkipToMain location={{ location: { pathname: 'path' } }} />)
    .toJSON()
  expect(tree).toMatchSnapshot()

  expect(tree.props.href).toEqual('path?scrollto=maniContent')
  expect(tree.props.className).toEqual('css-gb7gys-SkipToMain')
  expect(tree.children[0]).toEqual('Skip to main content.')
})
