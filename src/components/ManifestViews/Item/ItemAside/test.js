import React from 'react'
import { shallow } from 'enzyme'
import ItemAside from './'
import ImageSection from './ImageSection'
import ActionButtonGroup from 'components/Shared/ActionButtonGroup'

const wrapper = shallow(<ItemAside iiifManifest={{ id: 'id' }} location={{}} />)

test('ItemAside', () => {
  expect(wrapper.find(ImageSection).exists()).toBeTruthy()
  expect(wrapper.find(ActionButtonGroup).exists()).toBeTruthy()
})
