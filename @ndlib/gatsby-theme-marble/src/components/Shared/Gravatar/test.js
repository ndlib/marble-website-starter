import React from 'react'
import { shallow } from 'enzyme'
import gravatar from 'gravatar'
import Gravatar from './'

describe('Gravatar', () => {
  test('no size', () => {
    jest.spyOn(gravatar, 'url').mockImplementation(() => `https://gravatar.url`)
    const wrapper = shallow(<Gravatar email={'email@email.com'} />)
    expect(wrapper.dive().find('img').props().src).toEqual('https://gravatar.url')
  })
  test('size', () => {
    jest.spyOn(gravatar, 'url').mockImplementation(() => `https://gravatar100.url`)
    const wrapper = shallow(<Gravatar email={'email@email.com'} size={100} />)
    expect(wrapper.dive().find('img').props().src).toEqual('https://gravatar100.url')
  })
})
