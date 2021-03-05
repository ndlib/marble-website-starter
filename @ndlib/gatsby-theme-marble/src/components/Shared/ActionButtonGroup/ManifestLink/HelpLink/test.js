import React from 'react'
import { shallow } from 'enzyme'
import HelpLink from './'

test('HelpLink', () => {
  const wrapper = shallow(<HelpLink />)
  expect(wrapper.find('EmotionCssPropInternal').prop('href')).toEqual('common:iiifHelpURL')
})
