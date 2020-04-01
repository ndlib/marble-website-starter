import React from 'react'
import { shallow } from 'enzyme'
import { act } from 'react-dom/test-utils'
import DropDown from './'

describe('DropDown', () => {
  const mockSetState = jest.fn()
  jest.mock('react', () => ({
    useState: initial => [initial, mockSetState],
  }))
  test('render and click', () => {
    let wrapper
    const sxStyle = {
      wrapper: {},
      toggle: {},
      optionsOpen: { display: 'block' },
      optionsClosed: { display: 'none' },
    }
    const buttonLabel = <div className='button' />
    const options = <div className='options' />

    act(() => {
      wrapper = shallow(<DropDown sxStyle={sxStyle} buttonLabel={buttonLabel} options={options} />)
    })

    // expect it to be closed
    expect(wrapper.findWhere(c => {
      return c.prop('role') === 'listbox'
    }).props().css()[0].display).toEqual('none')

    // simulate click
    act(() => {
      wrapper.findWhere(c => {
        return c.prop('role') === 'button'
      }).props().onClick()
    })

    // expcect it to be open
    expect(wrapper.findWhere(c => {
      return c.prop('role') === 'listbox'
    }).props().css()[0].display).toEqual('block')

    // blur
    act(() => {
      const event = {
        currentTarget: {
          contains: jest.fn(),
        },
      }
      wrapper.find('.wrapper').props().onBlur(event)
    })

    // expect it to be closed
    expect(wrapper.findWhere(c => {
      return c.prop('role') === 'listbox'
    }).props().css()[0].display).toEqual('none')
  })
})
