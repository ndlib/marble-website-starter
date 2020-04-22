import React from 'react'
import { mount } from 'enzyme'
import { BaseStyles } from 'theme-ui'
import ReactModal from 'react-modal'
import ActionModal from './'

test('ActionModal', () => {
  console.error = jest.fn()
  const closeFunc = jest.fn()
  const props = {
    contentLabel: 'test label',
    isOpen: true,
    closeFunc: closeFunc,
    fullscreen: true,
  }
  const wrapper = mount(<ActionModal {...props} ><div className='children' /></ActionModal>)

  expect(wrapper.find(ReactModal).props().contentLabel).toEqual('test label')
  expect(wrapper.find('h1').text()).toEqual('test label')
  expect(wrapper.find('button').exists()).toBeTruthy()
  expect(wrapper.find('svg').exists()).toBeTruthy()
  expect(wrapper.find(BaseStyles).exists()).toBeTruthy()
  expect(wrapper.findWhere(c => {
    return c.prop('className') === 'children'
  }).exists()).toBeTruthy()
})
