import React from 'react'
import { shallow } from 'enzyme'
import ConstructionBanner from './'
import packageJson from '../../../../package.json'

test('ConstructionBanner', () => {
  const wrapper = shallow(<ConstructionBanner />)
  expect(wrapper.find('.versionText').text()).toEqual(`Alpha Release: ${packageJson.version}`)
})
