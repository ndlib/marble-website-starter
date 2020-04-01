import React from 'react'
import { shallow } from 'enzyme'
import { useStaticQuery } from 'gatsby'
import { SearchField } from './'

const searchReducer = {}
const dispatch = jest.fn()
const action = jest.fn()
const location = {}
useStaticQuery.mockImplementationOnce(() => {
  return {
    site: {
      siteMetadata: {
        searchBoxDefaultText: 'Search our digitized artwork, rare books, artifacts, and archival materials',
      },
    },
  }
})
const wrapper = shallow(
  <SearchField
    searchReducer={searchReducer}
    dispatch={dispatch}
    submitSearch={action}
    location={location}
    searchPath='my-search'
    className={'searchFieldClass'}
  />
)
describe('SearchField', () => {
  test('render input and label', () => {
    expect(wrapper.find('label').text()).toEqual('Search our digitized artwork, rare books, artifacts, and archival materials')
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
