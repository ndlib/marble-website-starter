import React from 'react'
import { mount } from 'enzyme'
import MaterialButton from './'

describe('MaterialButton', () => {
  test('default', () => {
    const onClick = jest.fn()
    const wrapper = mount(<MaterialButton onClick={onClick}>Label</MaterialButton>)
    expect(wrapper.find('button').exists()).toBeTruthy()
    wrapper.find('button').simulate('click')
    expect(onClick).toHaveBeenCalled()
  })
  test('wide primary', () => {
    const onClick = jest.fn()
    const wrapper = mount(<MaterialButton onClick={onClick} wide primary>Label</MaterialButton>)
    expect(wrapper.find('button').exists()).toBeTruthy()
    wrapper.find('button').simulate('click')
    expect(onClick).toHaveBeenCalled()
  })
})
