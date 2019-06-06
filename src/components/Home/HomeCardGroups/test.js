import React from 'react'
import { shallow } from 'enzyme'
import HomeCardGroups from './'
import HomeCardGroup from './HomeCardGroup'

test('HomeCardGroups', () => {
  const groups = [
    { label: 'Group 1', items: [] },
    { label: 'Group 2', items: [] },
    { label: 'Group 3', items: ['a', 'b', 'c'] },
  ]

  const wrapper = shallow(<HomeCardGroups groups={groups} />)
  expect(wrapper.find(HomeCardGroup).length).toEqual(3)
  expect(wrapper.find(HomeCardGroup).at(2).props().label).toEqual('Group 3')
  expect(wrapper.find(HomeCardGroup).at(2).props().items).toEqual(['a', 'b', 'c'])
})
