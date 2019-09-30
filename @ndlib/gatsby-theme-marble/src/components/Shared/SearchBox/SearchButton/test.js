import React from 'react'
import { shallow } from 'enzyme'
import { SearchButton } from './'

const location = {}
const searchReducer = {}
const action = jest.fn()
const wrapper = shallow(
  <SearchButton
    location={location}
    searchReducer={searchReducer}
    submitSearch={action}
    className='submitSearch'
    searchPath='search'
  />
)

describe('SearchButton', () => {
  test('render the button', () => {
    expect(wrapper.find('button').exists()).toBeTruthy()
    expect(wrapper.find('img').props().className).toEqual('searchIcon')
  })

  test('simulate click event', () => {
    wrapper.find('button').simulate('click')
    expect(action).toHaveBeenCalled()
  })
})
