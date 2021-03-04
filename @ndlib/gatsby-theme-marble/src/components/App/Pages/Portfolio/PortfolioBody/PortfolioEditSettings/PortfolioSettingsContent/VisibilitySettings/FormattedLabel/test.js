import React from 'react'
import { shallow } from 'enzyme'
import FormattedLabel from './'
import VisibilityLabel from 'components/Shared/VisibilityLabel'

test('FormattedLabel', () => {
  const props = {
    value: 'private',
    description: 'my description',
  }
  const wrapper = shallow(<FormattedLabel {...props} />)
  expect(wrapper.find(VisibilityLabel).props().visibility).toEqual('private')
  expect(wrapper.find('.description').html()).toContain('my description')
})
