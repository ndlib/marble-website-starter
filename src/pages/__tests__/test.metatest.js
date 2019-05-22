import React from 'react'
import MetaTest from '../metatest'
import { shallow } from 'enzyme'
import schema2 from 'components/Schema/basicschema2'
import schema3 from 'components/Schema/basicschema3'

const location = { some: 'location' }
test('Default Renders Properly', () => {
  const wrapper = shallow(<MetaTest schema={schema3} location={location} />)
  expect(wrapper.find('.title').exists()).toBeTruthy()
  expect(wrapper.find('.description').exists()).toBeTruthy()
  expect(wrapper.find('.alternateTitle').exists()).toBeTruthy()
})

test('Missing fields do not render', () => {
  const wrapper = shallow(<MetaTest schema={schema2} location={location} />)
  expect(wrapper.find('.alternateTitle').exists()).toBeFalsy()
})
