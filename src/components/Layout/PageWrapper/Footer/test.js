import React from 'react'
import { shallow } from 'enzyme'
import { Footer } from './'
import Navigation from 'components/Shared/Navigation'

test('Footer renders some divs with markdown text', () => {
  const data = {
    site: {
      siteMetadata: {
        menus: { footer: [ 'links go here!' ] },
        footerText: '<p>footer!!</p>',
      }
    }
  }
  const wrapper = shallow(<Footer data={data} />)

  expect(wrapper.find('footer.pageFooter').exists()).toBeTruthy()
  expect(wrapper.find('.footerInner').exists()).toBeTruthy()
  expect(wrapper.find('.footerText').exists()).toBeTruthy()
  expect(wrapper.find('.footerText').html()).toEqual('<div class="footerText"><p>footer!!</p></div>')
  expect(wrapper.find('.footerCenter').exists()).toBeTruthy()
  expect(wrapper.find('.footerLinks').exists()).toBeTruthy()
  expect(wrapper.find(Navigation).props().links).toEqual([ 'links go here!' ])
})
