import React from 'react'
import MetaTest from '../metatest'
import { shallow } from 'enzyme'
import schema1 from 'Configurations/Schema/basicschema1'
import schema2 from 'Configurations/Schema/basicschema2'
import schema3 from 'Configurations/Schema/basicschema3'

test('Default Renders Properly', () => {
  const wrapper = shallow(<MetaTest schema={schema3} />)
  expect(wrapper.find('.title').exists()).toBeTruthy()
  expect(wrapper.find('.description').exists()).toBeTruthy()
  expect(wrapper.find('.alternateTitle').exists()).toBeTruthy()
})

test('Missing fields do not render', () => {
  const wrapper = shallow(<MetaTest schema={schema2} />)
  expect(wrapper.find('.alternateTitle').exists()).toBeFalsy()
})
