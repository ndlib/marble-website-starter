import React from 'react'
import { shallow } from 'enzyme'
import TextField from './'

test('TextField', () => {
  const wrapper = shallow(<TextField id={'myId'} label={'My Label'} defaultValue={'Some text'} disabled={false} />)
  expect(wrapper.find('div').exists()).toBeTruthy()
  expect(wrapper.find('label').props().htmlFor).toEqual('myId')
  expect(wrapper.find('label').props().className).toEqual('editLabel')
  expect(wrapper.find('input').props().id).toEqual('myId')
  expect(wrapper.find('input').props().type).toEqual('text')
  expect(wrapper.find('input').props().className).toEqual('editText')
  expect(wrapper.find('input').props().disabled).toEqual(false)
  expect(wrapper.find('input').props().defaultValue).toEqual('Some text')
})
