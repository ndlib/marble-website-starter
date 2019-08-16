import React from 'react'
import SchemaRenderer from './'
import { shallow } from 'enzyme'
import schema2 from './schema/basicschema2'
import schema3 from './schema/basicschema3'
import renderer from './schema/rendering'

test('Default Renders Properly', () => {
  const wrapper = shallow(<SchemaRenderer schema={schema3} renderer={renderer} />)
  expect(wrapper.find('TitleMicro').exists()).toBeTruthy()
  expect(wrapper.find('Default').exists()).toBeTruthy()
})

test('Missing fields do not render', () => {
  const wrapper = shallow(<SchemaRenderer schema={schema2} renderer={renderer} />)
  expect(wrapper.find('.alternateTitle').exists()).toBeFalsy()
})
