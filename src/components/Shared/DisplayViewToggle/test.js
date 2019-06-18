import React from 'react'
import { shallow } from 'enzyme'
import { DisplayViewToggle } from './'
import DisplayViewToggleGridList from './DisplayViewToggleGridList'
import ToggleButton from './ToggleButton'
import {
  DISPLAY_GRID,
  DISPLAY_LIST,
} from 'store/actions/displayActions'

import listIcon from 'assets/icons/svg/baseline-view_list-24px.svg'
import gridIcon from 'assets/icons/svg/baseline-view_module-24px.svg'

test('DisplayViewToggle', () => {
  const page = 'somePage'
  const activeSettings = {
    breakpoints: { lg: 123 },
    cols: { lg: 2 },
    rowHeight: 5,
    cardWidth: 1,
  }
  const children = <div className='kids'>Child Element</div>
  const displayReducer = {
    somePage: DISPLAY_GRID,
  }
  const dispatch = jest.fn()
  const wrapper = shallow(<DisplayViewToggle page={page} activeSettings={activeSettings} displayReducer={displayReducer} dispatch={dispatch}>{children}</DisplayViewToggle>)

  expect(wrapper.find('.displayViewToggleGroup').exists()).toBeTruthy()
  expect(wrapper.find(ToggleButton).length).toEqual(2)
  expect(wrapper.find(ToggleButton).at(0).props().icon).toEqual(listIcon)
  expect(wrapper.find(ToggleButton).at(0).props().option).toEqual(DISPLAY_LIST)
  expect(wrapper.find(ToggleButton).at(0).props().active).toEqual(false)
  expect(wrapper.find(ToggleButton).at(1).props().icon).toEqual(gridIcon)
  expect(wrapper.find(ToggleButton).at(1).props().option).toEqual(DISPLAY_GRID)
  expect(wrapper.find(ToggleButton).at(1).props().active).toEqual(true)
  expect(wrapper.find(DisplayViewToggleGridList).props().activeSettings).toEqual(activeSettings)
  expect(wrapper.find('.kids').text()).toEqual('Child Element')
})
