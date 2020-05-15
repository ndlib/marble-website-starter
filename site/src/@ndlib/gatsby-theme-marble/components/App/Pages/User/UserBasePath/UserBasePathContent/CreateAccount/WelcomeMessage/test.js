import React from 'react'
import { shallow } from 'enzyme'
import WelcomeMessage from './'

test('WelcomeMessage', () => {
  const wrapper = shallow(<WelcomeMessage />)
  const welcomeText = 'Welcome to the Digital Collections of the University of Notre Dame. Fill out a few pieces of information and review our privacy and acceptable use policy to set up your account. When logged in, you can create, save, and share portfolios of collection items.'
  expect(wrapper.find('p').text()).toEqual(welcomeText)
})
