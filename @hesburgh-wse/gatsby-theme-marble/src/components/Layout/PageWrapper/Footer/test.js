import React from 'react'
import { shallow } from 'enzyme'
import { useStaticQuery } from 'gatsby'
import Footer from './'
import Menu from 'components/Shared/Menu'

test('Footer renders some divs with markdown text', () => {
  useStaticQuery.mockImplementationOnce(() => {
    return {
      site: {
        siteMetadata: {
          footerText: '<p>footer!!</p>',
        },
      },
    }
  })
  const wrapper = shallow(<Footer />)

  expect(wrapper.find('footer.pageFooter').exists()).toBeTruthy()
  expect(wrapper.find('.footerInner').exists()).toBeTruthy()
  expect(wrapper.find('.footerText').exists()).toBeTruthy()
  expect(wrapper.find('.footerText').html()).toEqual('<div class="footerText"><span><p>footer!!</p></span></div>')
  expect(wrapper.find('.footerLinks').exists()).toBeTruthy()
  expect(wrapper.find(Menu).props().menu).toEqual('footer')
})
