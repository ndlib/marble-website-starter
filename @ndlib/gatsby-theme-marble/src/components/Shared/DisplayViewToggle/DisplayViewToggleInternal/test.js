import React from 'react'
import { shallow } from 'enzyme'
import { CardGroupShared } from './'
import ToggleButton from './ToggleButton'
import {
  DISPLAY_GRID,
  DISPLAY_LIST,
} from 'store/actions/displayActions'

import listIconActive from 'assets/icons/svg/baseline-view_list-24px-white.svg'
import gridIconActive from 'assets/icons/svg/baseline-view_module-24px-white.svg'
import listIconInactive from 'assets/icons/svg/baseline-view_list-24px.svg'
import gridIconInactive from 'assets/icons/svg/baseline-view_module-24px.svg'
const options = [
  {
    display: DISPLAY_LIST,
    inactiveIcon: listIconInactive,
    activeIcon: listIconActive,
  },
  {
    display: DISPLAY_GRID,
    inactiveIcon: gridIconInactive,
    activeIcon: gridIconActive,
  },
]

test('CardGroup', () => {
  const page = 'somePage'
  const activeSettings = {
    breakpoints: { lg: 123 },
    cols: { lg: 2 },
    rowHeight: 5,
    cardWidth: 1,
  }
  const children = <div className='kids' key='1'>Child Element</div>
  const displayReducer = {
    somePage: DISPLAY_GRID,
  }
  const dispatch = jest.fn()
  const wrapper = shallow(
    <CardGroupShared
      page={page}
      activeSettings={activeSettings}
      displayReducer={displayReducer}
      dispatch={dispatch}
    >{[children]}</CardGroupShared>,
  )

  expect(wrapper.find(ToggleButton).length).toEqual(2)
  expect(wrapper.find(ToggleButton).at(0).props().option).toEqual(options[0])
  expect(wrapper.find(ToggleButton).at(1).props().option).toEqual(options[1])
  expect(wrapper.find('.kids').text()).toEqual('Child Element')
})
