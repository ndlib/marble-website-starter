import React from 'react'
import { shallow } from 'enzyme'
import ReturnToSearch from './'
import { BaseStyles } from 'theme-ui'
import i18n from '@ndlib/gatsby-theme-marble/src/i18n/i18nextForTest'

describe('ReturnToSearch', () => {
  test('no location', () => {
    const wrapper = shallow(<ReturnToSearch />)
    expect(wrapper.find(BaseStyles).exists()).toBeFalsy()
  })

  test('location with search reference', () => {
    const location = {
      state: {
        key: '1591659506194',
        referal: {
          query: '?q=',
          type: 'search',
        },
      },
    }
    const wrapper = shallow(<ReturnToSearch location={location} i18n={i18n} />)
    expect(wrapper.find(BaseStyles).exists()).toBeTruthy()
  })
})
