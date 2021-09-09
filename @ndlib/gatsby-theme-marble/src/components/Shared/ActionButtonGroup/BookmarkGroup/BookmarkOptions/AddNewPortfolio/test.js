import React from 'react'
import { shallow } from 'enzyme'
import { act } from 'react-dom/test-utils'
import { AddNewPortfolio, successFunc } from './'
import * as Api from 'utils/api'

describe('AddNewPortfolio', () => {
  const mockSetState = jest.fn()
  jest.mock('react', () => ({
    useState: initial => [initial, mockSetState],
  }))

  test('render and click', () => {
    jest.spyOn(Api, 'savePortfolioCollectionQuery').mockImplementationOnce(() => {
      return new Promise(async (resolve, reject) => {
        resolve("data")
      })
    })

    let wrapper
    const props = {
      portfolios: [],
      addFunc: jest.fn(),
      loginReducer: { user: { uuid: 'a' } },
    }

    // render
    act(() => {
      wrapper = shallow(<AddNewPortfolio {...props} />)
    })

    // expect default button
    expect(wrapper.find('.add-button').text()).toEqual('Create A New Portfolio')

    // click button
    act(() => {
      wrapper.find('.add-button').props().onClick()
    })

    // expect input and submit button
    expect(wrapper.findWhere(c => {
      return c.prop('type') === 'text'
    }).prop('defaultValue')).toEqual('My Portfolio')
    expect(wrapper.findWhere(c => {
      return c.prop('type') === 'text'
    }).prop('disabled')).toEqual(false)
    expect(wrapper.find('.submit-button').text()).toEqual('create')

    // change text in input
    act(() => {
      const e = {
        target: {
          value: 'Fancy Portfolio',
        },
      }
      wrapper.findWhere(c => {
        return c.prop('type') === 'text'
      }).props().onChange(e)
    })

    // expect new text in input
    expect(wrapper.findWhere(c => {
      return c.prop('type') === 'text'
    }).prop('defaultValue')).toEqual('Fancy Portfolio')

    // click submit
    act(() => {
      wrapper.find('.submit-button').props().onClick()
    })

    // expect input to be disabled
    expect(wrapper.findWhere(c => {
      return c.prop('type') === 'text'
    }).prop('disabled')).toEqual(true)
  })

  test('successFunc', () => {
    const data = { title: 'new' }
    const portfolios = [
      { title: 'old-1' },
      { title: 'old-2' },
    ]
    const addFunc = jest.fn()
    const setCreating = jest.fn()
    const setEditable = jest.fn()
    const setTitle = jest.fn()

    successFunc({
      data: data,
      portfolios: portfolios,
      addFunc: addFunc,
      setCreating: setCreating,
      setEditable: setEditable,
      setTitle: setTitle,
    })

    // expect add to have been called with expected result
    expect(addFunc).toHaveBeenCalledWith([
      { title: 'new' },
      { title: 'old-1' },
      { title: 'old-2' },
    ])
    expect(setCreating).toHaveBeenCalledWith(false)
    expect(setEditable).toHaveBeenCalledWith(false)
    expect(setTitle).toHaveBeenCalledWith('My Portfolio')
  })
})
