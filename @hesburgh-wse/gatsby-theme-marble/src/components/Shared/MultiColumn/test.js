import React from 'react'
import { shallow } from 'enzyme'
import MultiColumn from './'

describe('MultiColumn', () => {
  test('children', () => {
    const children = [{}, {}, {}]
    const wrapper = shallow(<MultiColumn>{children}</MultiColumn>)
    expect(wrapper.find('.multiColumn-3').length).toEqual(1)
    expect(wrapper.find('.col').length).toEqual(3)
  })
  test('columns and colSpan', () => {
    const columns = '5'
    const children = [{}, { props: { colSpan: '3' } }, {}]
    const wrapper = shallow(<MultiColumn columns={columns}>{children}</MultiColumn>)
    expect(wrapper.find('.multiColumn-5').length).toEqual(1)
    expect(wrapper.find('.col').length).toEqual(3)
    expect(wrapper.find('.col-span-3').length).toEqual(1)
  })
})
