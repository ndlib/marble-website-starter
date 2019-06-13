import React from 'react'
import SchemaRenderer from './'
import { shallow } from 'enzyme'
import schema2 from '../../../../content/schema/basicschema2'
import schema3 from '../../../../content/schema/basicschema3'
import renderer from '../../../../content/schema/rendering'

test('Default Renders Properly', () => {
  const wrapper = shallow(<SchemaRenderer schema={schema3} renderer={renderer} />)
  expect(wrapper.find('TitleMicro').exists()).toBeTruthy()
  expect(wrapper.find('Default').exists()).toBeTruthy()
})

test('Missing fields do not render', () => {
  const wrapper = shallow(<SchemaRenderer schema={schema2} renderer={renderer} />)
  expect(wrapper.find('.alternateTitle').exists()).toBeFalsy()
})
