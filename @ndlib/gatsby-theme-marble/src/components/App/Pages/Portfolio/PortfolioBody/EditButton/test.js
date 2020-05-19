import React from 'react'
import { mount } from 'enzyme'
import { act } from 'react-dom/test-utils'
import EditButton from './'

describe('EditButton', () => {
  const setEditFunc = jest.fn()
  test('not isOwner', () => {
    const wrapper = mount(<EditButton isOwner={false} setEditFunc={setEditFunc} />)
    expect(wrapper.find('button').exists()).toBeFalsy()
  })
  test('isOwner', () => {
    let wrapper
    act(() => {
      wrapper = mount(<EditButton isOwner setEditFunc={setEditFunc} />)
      wrapper.find('button').props().onClick()
      expect(setEditFunc).toHaveBeenCalled()
    })
  })
})
