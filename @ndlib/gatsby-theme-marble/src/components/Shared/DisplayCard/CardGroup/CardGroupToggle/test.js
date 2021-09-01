import React from 'react'
import { mount } from 'enzyme'
import * as redux from 'react-redux'
import { createStore } from 'redux'
import { CardGroupToggle } from './'
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
const store = createStore(() => [])

describe('CardGroupToggle', () => {
  test('CardGroupToggle', () => {
    const page = 'somePage'
    const wrapper = mount(
      <redux.Provider store={store}>
        <CardGroupToggle
          toggleGroup={page}
          layout={DISPLAY_GRID}
        /> </redux.Provider>
    )

    expect(wrapper.find(ToggleButton).length).toEqual(2)
    expect(wrapper.find(ToggleButton).at(0).props().option).toEqual(options[0])
    expect(wrapper.find(ToggleButton).at(1).props().option).toEqual(options[1])
  })
})
