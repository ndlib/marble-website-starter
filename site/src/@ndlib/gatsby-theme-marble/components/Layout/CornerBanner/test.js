import React from 'react'
import { shallow } from 'enzyme'
import CornerBanner from './'

test('CornerBanner', () => {
  const wrapper = shallow(<CornerBanner />)
  expect(wrapper.find('.versionText').text()).toEqual('Beta Preview')
})
