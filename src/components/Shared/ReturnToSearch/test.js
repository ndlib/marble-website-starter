import React from 'react'
import { shallow } from 'enzyme'
import ReturnToSearch from './'
import Link from 'components/Shared/Link'

describe('ReturnToSearch', () => {
  test('no location', () => {
    const wrapper = shallow(<ReturnToSearch />)
    expect(wrapper.find('nav').exists()).toBeFalsy()
  })

  test('location with search reference', () => {
    const location = {
      state: {
        referal: { type: 'search', query: '?query&string' },
      },
    }
    const wrapper = shallow(<ReturnToSearch location={location} />)
    expect(wrapper.find('nav').exists()).toBeTruthy()
    expect(wrapper.find(Link).props().to).toEqual(`/search?query&string`)
  })
})
