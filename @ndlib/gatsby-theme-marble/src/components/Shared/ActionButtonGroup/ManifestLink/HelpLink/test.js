import React from 'react'
import { shallow } from 'enzyme'
import HelpLink from './'

test('HelpLink', () => {
  const wrapper = shallow(<HelpLink />)
  expect(wrapper.find('EmotionCssPropShared').prop('href')).toEqual('common:iiifHelpURL')
})
