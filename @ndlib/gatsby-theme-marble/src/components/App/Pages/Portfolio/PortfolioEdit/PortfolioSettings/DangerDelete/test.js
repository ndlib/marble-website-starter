import React from 'react'
import { mount } from 'enzyme'
import DangerDelete from './'
import { navigate } from 'gatsby'
import MaterialButton from 'components/Internal/MaterialButton'

describe('DangerDelete', () => {
  console.log = jest.fn()
  const props = {
    portfolio: {
      id: 'my-id',
      title: 'Portfolio Title',
    },
  }
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('confirm', () => {
    jest.spyOn(window, 'confirm').mockImplementationOnce(() => true)
    const wrapper = mount(<DangerDelete {...props} />)

    expect(wrapper.find('input').props().id).toEqual('delete')
    wrapper.find(MaterialButton).simulate('click')
    expect(navigate).not.toHaveBeenCalled()
    wrapper.find('input').simulate('change', { target: { value: 'Portfolio Title' } })
    wrapper.find(MaterialButton).simulate('click')
    expect(navigate).toHaveBeenCalled()
  })
  test('cancel', () => {
    jest.spyOn(window, 'confirm').mockImplementationOnce(() => false)
    const wrapper = mount(<DangerDelete {...props} />)

    expect(wrapper.find('input').props().id).toEqual('delete')
    wrapper.find(MaterialButton).simulate('click')
    expect(navigate).not.toHaveBeenCalled()
    wrapper.find('input').simulate('change', { target: { value: 'Portfolio Title' } })
    wrapper.find(MaterialButton).simulate('click')
    expect(navigate).not.toHaveBeenCalled()
  })
})
