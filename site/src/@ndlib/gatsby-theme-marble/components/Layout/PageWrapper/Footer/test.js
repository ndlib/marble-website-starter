import React from 'react'
import { shallow } from 'enzyme'
import { Footer as ThemeFooter } from 'theme-ui'
import Footer from './'
import Menu from '@ndlib/gatsby-theme-marble/src/components/Shared/Menu'

test('Footer', () => {
  const wrapper = shallow(<Footer />)
  expect(wrapper.find('address').text()).toEqual('Notre Dame, IN 46556 USA')
  expect(wrapper.find(Menu).props().menu).toEqual('footer')
})
