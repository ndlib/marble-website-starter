import React from 'react'
import { shallow } from 'enzyme'
import { Layout } from './'
import PrivateRoute from './PrivateRoute'
import PageWrapper from './PageWrapper'
import ContentWrapper from './ContentWrapper'
import PageContent from './PageContent'

test('Layout', () => {
  const props = {
    title: 'test-title',
    noPadding: false,
    requireLogin: false,
    location: { some: 'place' },
  }
  const wrapper = shallow(<Layout {...props}><div className='child' /></Layout>)
  expect(wrapper.find(PrivateRoute).props().location).toEqual(props.location)
  expect(wrapper.find(PrivateRoute).props().requireLogin).toEqual(props.requireLogin)
  expect(wrapper.find(PageWrapper).props().location).toEqual(props.location)
  expect(wrapper.find(ContentWrapper).props().noPadding).toEqual(props.noPadding)
  expect(wrapper.find(PageContent).props().title).toEqual(props.title)
  expect(wrapper.find('.child').exists()).toBeTruthy()
})
