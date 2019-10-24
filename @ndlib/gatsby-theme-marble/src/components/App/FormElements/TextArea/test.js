import React from 'react'
import { shallow } from 'enzyme'
import TextArea from './'

test('TextField', () => {
  const wrapper = shallow(<TextArea id={'myId'} label={'My Label'} defaultValue={'Some text'} disabled={false} />)
  expect(wrapper.find('div').exists()).toBeTruthy()
  expect(wrapper.find('label').props().htmlFor).toEqual('myId')
  expect(wrapper.find('label').props().className).toEqual('editLabel')
  expect(wrapper.find('textarea').props().id).toEqual('myId')
  expect(wrapper.find('textarea').props().className).toEqual('editTextArea')
  expect(wrapper.find('textarea').props().disabled).toEqual(false)
  expect(wrapper.find('textarea').props().defaultValue).toEqual('Some text')
})
