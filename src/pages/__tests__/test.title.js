import React from 'react'
import TitleMicro from 'components/MicroComp/titlemicro'
import { shallow } from 'enzyme'

const meta = { id: 2, label: 'Title', renderer: 'title', key: ['headline'] }
const schema = { 'headline': 'A Title' }

test('TitleMicro Renders Properly', () => {
  const wrapper = shallow(<TitleMicro schema={schema} meta={meta} />)
  expect(wrapper.find('h1').props().className).toEqual(meta.key)
  expect(wrapper.find('h1').text()).toEqual('A Title')
})
