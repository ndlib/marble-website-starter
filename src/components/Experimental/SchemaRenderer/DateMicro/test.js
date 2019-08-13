import React from 'react'
import DateMicro from './'
import { shallow } from 'enzyme'

const meta = { id: 5, label: 'DateCreated', renderer: 'date', key: ['dateCreated'] }
const schema = { dateCreated: '2016-01-01' }

test('DateMicro Renders Properly', () => {
  const wrapper = shallow(<DateMicro schema={schema} meta={meta} />)
  expect(wrapper.find('dt').props().className).toEqual(meta.key)
  expect(wrapper.find('dd').text()).toEqual('2016-01-01')
})
