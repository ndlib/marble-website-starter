import React from 'react'
import { shallow } from 'enzyme'
import { useStaticQuery } from 'gatsby'
import SearchBox from './'
import SearchButton from './SearchButton'
import SearchField from './SearchField'

describe('SearchBox', () => {
  test('renders the expected components', () => {
    useStaticQuery.mockImplementationOnce(() => {
      return {
        site: {
          siteMetadata: {
            searchPath: 'My Title',
          },
        },
      }
    })
    const wrapper = shallow(<SearchBox location={{}} />)
    expect(wrapper.find(SearchButton).exists()).toBeTruthy()
    expect(wrapper.find(SearchField).exists()).toBeTruthy()
  })
})
