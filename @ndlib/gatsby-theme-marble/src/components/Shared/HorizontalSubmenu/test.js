import React from 'react'
import { shallow } from 'enzyme'
import HorizontalSubmenu from './'

describe('HorizontalSubmenu', () => {
  test('no options', () => {
    const wrapper = shallow(<HorizontalSubmenu />)
    expect(wrapper.find('.buttonGroup').exists()).toBeFalsy()
  })
  test('options', () => {
    const event = { preventDefault: () => jest.fn() }
    const options = [
      {
        label: 'Option 1',
        isActive: true,
        func: jest.fn(),
      },
      {
        label: 'Option 2',
        isActive: false,
        func: jest.fn(),
      },
      {
        label: 'Option 3',
        isActive: false,
        func: jest.fn(),
      },
    ]
    const wrapper = shallow(<HorizontalSubmenu options={options} />)
    expect(wrapper.find('.buttonGroup').exists()).toBeTruthy()
    expect(wrapper.find('button').length).toEqual(3)
    wrapper.find('button').at(1).simulate('click', event)
  })
})
