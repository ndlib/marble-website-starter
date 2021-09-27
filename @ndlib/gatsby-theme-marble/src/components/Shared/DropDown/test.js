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
      wrapper = shallow(<DropDown sxStyle={sxStyle} buttonText='hi' buttonLabel={buttonLabel} options={options} />)
    })

    // simulate click
    act(() => {
      const event = {
        preventDefault: jest.fn(),
      }
      wrapper.find('.dropdown-toggle').props().onClick(event)
    })

    // blur
    act(() => {
      const event = {
        currentTarget: {
          contains: jest.fn(),
        },
      }
      wrapper.find('.wrapper').props().onBlur(event)
    })
  })
})
