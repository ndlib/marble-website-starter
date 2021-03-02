import React from 'react'
import { shallow } from 'enzyme'
import PageContent from './'

describe('PageContent', () => {
  test('title', () => {
    const wrapper = shallow(<PageContent title='title' location={{}}><div className='child' /></PageContent>)
    //    expect(wrapper.find('main').props().id).toEqual('mainContent')
    expect(wrapper.find('h1').text()).toEqual('title')
    expect(wrapper.find('article').exists()).toBeTruthy()
    expect(wrapper.find('.child').exists()).toBeTruthy()
  })
  test('no title', () => {
    const wrapper = shallow(<PageContent location={{}}><div className='child' /></PageContent>)
    // expect(wrapper.find('main').props().id).toEqual('mainContent')
    expect(wrapper.find('h1').exists()).toBeFalsy()
    expect(wrapper.find('article').exists()).toBeTruthy()
    expect(wrapper.find('.child').exists()).toBeTruthy()
  })
})
