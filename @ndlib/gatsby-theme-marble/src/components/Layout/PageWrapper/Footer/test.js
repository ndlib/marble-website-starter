import React from 'react'
import { shallow } from 'enzyme'
import { useStaticQuery } from 'gatsby'
import { Footer as ThemeFooter } from 'theme-ui'
import Footer from './'
import Menu from 'components/Shared/Menu'

test('Footer renders some divs with markdown text', () => {
  const wrapper = shallow(<Footer />)

  expect(wrapper.find(ThemeFooter).exists()).toBeTruthy()
  expect(wrapper.find(Menu).props().menu).toEqual('footer')
})
