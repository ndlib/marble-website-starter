import React from 'react'
import Default from 'components/MicroComp/default'
import { shallow } from 'enzyme'
import schema2 from 'components/Schema/basicschema2'

const meta = {id: 3, label: "Description", renderer: "basic", key: ["description"]}
test('Default Renders Properly', () => {
  const wrapper = shallow(<Default schema={schema2} meta={meta} />)
  expect(wrapper.find('dt').props().className).toEqual(meta.key)
  expect(wrapper.find('dt').text()).toEqual(meta.label+':')
  expect(wrapper.find('dd').props().className).toEqual(meta.key)
  expect(wrapper.find('dd').text()).toEqual(schema2['description'])
})
