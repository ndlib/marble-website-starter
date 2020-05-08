import React from 'react'
import { mount } from 'enzyme'
import { act } from 'react-dom/test-utils'
import ImageSettings from './'

describe('ImageSettings', () => {
  const props = {
    sxStyle: {},
    size: 'full',
    setSize: jest.fn(),
    format: 'jpg',
    setFormat: jest.fn(),
  }

  const wrapper = mount(<ImageSettings {...props} />)

  test('size', () => {
    act(() => {
      const e = {
        target: {
          value: 'pct:25',
        },
      }
      wrapper.find('select').at(0).props().onChange(e)
    })
    expect(props.setSize).toHaveBeenCalledWith('pct:25')
  })

  test('format', () => {
    act(() => {
      const e = {
        target: {
          value: 'png',
        },
      }
      wrapper.find('select').at(1).props().onChange(e)
    })
    expect(props.setFormat).toHaveBeenCalledWith('png')
  })
})
