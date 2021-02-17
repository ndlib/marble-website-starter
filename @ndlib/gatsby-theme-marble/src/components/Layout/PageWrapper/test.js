import React from 'react'
import { shallow } from 'enzyme'
import PageWrapper from './'
import SkipToMain from './SkipToMain'
import Footer from './Footer'

test('PageWrapper', () => {
  const children = <span className='kids'>Stuff Goes Here</span>
  const location = { my: 'location' }
  const wrapper = shallow(<PageWrapper location={location}>{children}</PageWrapper>)
  expect(wrapper.find(SkipToMain).exists()).toBeTruthy()
  expect(wrapper.find('.kids').text()).toEqual('Stuff Goes Here')
  expect(wrapper.find(Footer).exists()).toBeTruthy()
})
