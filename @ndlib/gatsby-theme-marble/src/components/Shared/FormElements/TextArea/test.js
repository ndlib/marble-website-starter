import React from 'react'
import { mount } from 'enzyme'
import TextArea from './'

test('TextField', () => {
  const wrapper = mount(<TextArea id={'myId'} label={'My Label'} defaultValue={'Some text'} disabled={false} />)
  expect(wrapper.find('div').exists()).toBeTruthy()
  expect(wrapper.find('label').props().htmlFor).toEqual('myId')
  expect(wrapper.find('textarea').props().id).toEqual('myId')
  expect(wrapper.find('textarea').props().disabled).toEqual(false)
  expect(wrapper.find('textarea').props().defaultValue).toEqual('Some text')
})
