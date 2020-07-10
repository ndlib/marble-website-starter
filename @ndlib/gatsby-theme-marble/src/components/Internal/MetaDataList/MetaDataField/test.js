import React from 'react'
import { shallow } from 'enzyme'
import MetaDataField from './'
import MetaDataLabel from './MetaDataLabel'
import MetaDataValue from './MetaDataValue'

console.error = jest.fn()
describe('MetaDataField', () => {
  test('empty metadata', () => {
    const metadata = {}
    const wrapper = shallow(<MetaDataField metadata={metadata} />)
    expect(wrapper.find(MetaDataLabel).exists()).toBeFalsy()
    expect(wrapper.find(MetaDataValue).exists()).toBeFalsy()
  })

  test('metadata', () => {
    const metadata = {
      label: 'test label',
      value: ['test value'],
    }
    const wrapper = shallow(<MetaDataField metadata={metadata} />)
    expect(wrapper.find(MetaDataLabel).props().labels).toEqual(['test label'])
    expect(wrapper.find(MetaDataValue).props().values).toEqual(['test value'])
  })
})
