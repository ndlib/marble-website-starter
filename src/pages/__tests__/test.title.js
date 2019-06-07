import React from 'react'
import TitleMicro from 'components/MicroComp/titlemicro'
import { shallow } from 'enzyme'
import schema2 from 'components/Schema/basicschema2'

const meta = { id: 2, label: 'Title', renderer: 'title', key: ['headline'] }
test('TitleMicro Renders Properly', () => {
  const wrapper = shallow(<TitleMicro schema={schema2} meta={meta} />)
  expect(wrapper.find('h1').props().className).toEqual(meta.key)
  expect(wrapper.find('h1').text()).toEqual(schema2[meta.key])
})
