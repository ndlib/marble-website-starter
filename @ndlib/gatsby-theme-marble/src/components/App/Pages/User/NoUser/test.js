import React from 'react'
import { shallow } from 'enzyme'
import NoUser, { defaultTitle } from './'
import Layout from 'components/Layout'
import Seo from 'components/Internal/Seo'

test('NoUser', () => {
  const props = {
    location: {},
    username: 'invaliduser',
  }
  const wrapper = shallow(<NoUser {...props} />)
  expect(wrapper.find(Layout).props().title).toEqual(defaultTitle)
  expect(wrapper.find(Seo).props().title).toEqual(defaultTitle)
})
