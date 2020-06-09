import React from 'react'
import { shallow } from 'enzyme'
import ReturnToSearch from './'
import { BaseStyles } from 'theme-ui'
import Link from 'components/Internal/Link'

describe('ReturnToSearch', () => {
  test('no location', () => {
    const wrapper = shallow(<ReturnToSearch />)
    expect(wrapper.find(BaseStyles).exists()).toBeFalsy()
  })

  test('location with search reference', () => {
    const location = {
      state: {
        referal: { type: 'search', query: '?query&string' },
      },
    }
    const wrapper = shallow(<ReturnToSearch location={location} />)
    expect(wrapper.find(BaseStyles).exists()).toBeTruthy()
  })
})
