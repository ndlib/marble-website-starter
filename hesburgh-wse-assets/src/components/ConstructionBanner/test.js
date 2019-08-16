import React from 'react'
import { shallow } from 'enzyme'
import ConstructionBanner from './'

test('ConstructionBanner', () => {
  const wrapper = shallow(<ConstructionBanner text={'Constructing'} />)
  expect(wrapper.find('.versionText').text()).toEqual('Constructing')
})
