import React from 'react'
import { shallow } from 'enzyme'
import DisplayViewToggleGridList from './'
import ResponsiveGridList from 'components/Internal/ResponsiveGridList'

test('DisplayViewToggleGridList', () => {
  const activeSettings = {
    breakpoints: { lg: 123 },
    cols: { lg: 2 },
    rowHeight: 5,
    cardWidth: 1,
  }
  const wrapper = shallow(<DisplayViewToggleGridList activeSettings={activeSettings}><div className='child'>Child Content</div></DisplayViewToggleGridList>)

  expect(wrapper.find(ResponsiveGridList).props().breakpoints).toEqual({ lg: 123 })
  expect(wrapper.find(ResponsiveGridList).props().cols).toEqual({ lg: 2 })
  expect(wrapper.find(ResponsiveGridList).props().rowHeight).toEqual(5)
  expect(wrapper.find(ResponsiveGridList).props().cardWidth).toEqual(1)
  expect(wrapper.find(ResponsiveGridList).props().measureBeforeMount).toEqual(true)
  expect(wrapper.find('.child').text()).toEqual('Child Content')
})
