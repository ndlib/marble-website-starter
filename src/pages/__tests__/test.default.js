import React from 'react'
import Default from 'components/MicroComp/default'
import { shallow } from 'enzyme'

const meta = { id: 3, label: 'Description', renderer: 'basic', key: ['description'] }
const schema = {'description': 'Some text'}

test('Default Renders Properly', () => {
  const wrapper = shallow(<Default schema={schema} meta={meta} />)
  expect(wrapper.find('dt').props().className).toEqual(meta.key)
  expect(wrapper.find('dt').text()).toEqual(meta.label+':')
  expect(wrapper.find('dd').props().className).toEqual(meta.key)
  expect(wrapper.find('dd').text()).toEqual('Some text')
})
