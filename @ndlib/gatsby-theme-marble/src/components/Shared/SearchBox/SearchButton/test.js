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
  />,
)

describe('SearchButton', () => {
  test('render the button', () => {
    expect(wrapper.find('div').props().role).toEqual('button')
  })

  test('simulate click event', () => {
    wrapper.find('div').simulate('click')
    expect(action).toHaveBeenCalled()
  })
})
