import React from 'react'
import { shallow } from 'enzyme'
import RadioList from './'

describe('RadioList', () => {
  test('no options', () => {
    const props = {
      options: null,
      fieldName: 'fieldName',
      onChange: jest.fn(),
    }
    const wrapper = shallow(<RadioList {...props} />)
    expect(wrapper.find('#fieldName').exists()).toBeFalsy()
  })
  test('empty options', () => {
    const props = {
      options: [],
      fieldName: 'fieldName',
      onChange: jest.fn(),
    }
    const wrapper = shallow(<RadioList {...props} />)
    expect(wrapper.find('#fieldName').exists()).toBeFalsy()
  })
  test('options', () => {
    const onChangeSpy = jest.fn()
    const props = {
      options: [
        {
          value: '0',
          option: '0',
          optionChecked: false,
          formattedLabel: <div>Label 0</div>,
        },
        {
          value: '1',
          option: '1',
          optionChecked: true,
          formattedLabel: <div>Label 1</div>,
        },
      ],
      fieldName: 'fieldName',
      onChange: onChangeSpy,
    }
    const wrapper = shallow(<RadioList {...props} />)
    expect(wrapper.find('#fieldName').exists()).toBeTruthy()
    expect(wrapper.find('input').length).toEqual(2)
    wrapper.find('input').at(0).simulate('change')
    expect(onChangeSpy).toBeCalled()
  })
})
