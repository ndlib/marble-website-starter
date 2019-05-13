import React from 'react'
import { shallow } from 'enzyme'
import { BrowseTemplate } from '../browse'

test('it renders the manifest template', () => {
  const data = {
    data: { id: 'manifest' },
  }

  const wrapper = shallow(<BrowseTemplate data={data} location={{}} />)
  expect(wrapper.find('Browse').exists()).toBeTruthy()
  expect(wrapper.find('Browse').prop('data')).toEqual(data)
})
