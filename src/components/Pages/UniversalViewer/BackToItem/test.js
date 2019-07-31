import React from 'react'
import { shallow } from 'enzyme'
import BackToItem from './'

describe('BackToItem', () => {
  test('show', () => {
    const location = {
      state: {
        referal: {
          type: 'item',
          backLink: '/back-to-item',
        },
      },
    }
    const wrapper = shallow(<BackToItem location={location} />)
    expect(wrapper.find('.backLink').props().to).toEqual('/back-to-item')
  })
  test('do not show', () => {
    const wrapper = shallow(<BackToItem location={{}} />)
    expect(wrapper.find('.backLink').exists()).toBeFalsy()
  })
})
