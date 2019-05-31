import React from 'react'
import { shallow } from 'enzyme'
import ImageSection from './'
import Link from 'components/Shared/Link'
import Image from 'components/Shared/Image'
import ExpandIcon from './ExpandIcon'
import ItemAlternateViews from './ItemAlternateViews'

const manifest = {
  id: 'id',
}
const wrapper = shallow(<ImageSection iiifManifest={manifest} location={{}} />)

test('ImageSection', () => {
  expect(wrapper.find('section').exists()).toBeTruthy()
  expect(wrapper.find(Link).props().to).toEqual('/viewer?manifest=id')
  expect(wrapper.find(Image).exists()).toBeTruthy()
  expect(wrapper.find(ExpandIcon).exists()).toBeTruthy()
  expect(wrapper.find(ItemAlternateViews).exists()).toBeTruthy()
})
