import React from 'react'
import DateMicro from 'components/MicroComp/datemicro'
import { shallow } from 'enzyme'
import schema2 from 'components/Schema/basicschema2'
import moment from 'moment'

const meta = { id: 5, label: 'DateCreated', renderer: 'date', key: ['dateCreated'] }
test('DateMicro Renders Properly', () => {
  const wrapper = shallow(<DateMicro schema={schema2} meta={meta} />)
  expect(wrapper.find('dt').props().className).toEqual(meta.key)
  expect(wrapper.find('dd').text()).toEqual(moment(schema2[meta.key]).format('YYYY-MM-DD'))
})
