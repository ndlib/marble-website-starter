import React from 'react'
import { shallow } from 'enzyme'
import { SearchField } from './'
import i18n from '@ndlib/gatsby-theme-marble/src/i18n/i18nextForTest'

const searchReducer = {}
const dispatch = jest.fn()
const action = jest.fn()
const location = {}

const wrapper = shallow(
  <SearchField
    searchReducer={searchReducer}
    dispatch={dispatch}
    submitSearch={action}
    location={location}
    searchPath='search'
    className='searchFieldClass'
    i18n={i18n}
  />,
)
describe('SearchField', () => {
  test('render input and label', () => {
    expect(wrapper.find('label').text()).toEqual('search.prompt')
    expect(wrapper.find('input').props().type).toEqual('text')
  })

  test('key down - not enter key', () => {
    wrapper.find('#searchField').simulate('keyDown', { keyCode: 42 })
    expect(action).not.toHaveBeenCalled()
  })

  test('key down - enter key', () => {
    wrapper.find('#searchField').simulate('keyDown', { keyCode: 13 })
    expect(action).toHaveBeenCalled()
  })

  test('test onChange event', () => {
    wrapper.find('#searchField').simulate('change', { target: { value: 'xyz' } })
    expect(dispatch).toHaveBeenCalled()
  })
})
