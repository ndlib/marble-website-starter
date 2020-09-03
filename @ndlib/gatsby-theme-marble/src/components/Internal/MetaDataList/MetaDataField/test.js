import React from 'react'
import { shallow } from 'enzyme'
import MetaDataField from './'
import MetaDataLabel from './MetaDataLabel'
import MetaDataValue from './MetaDataValue'
import MetaDataSearchValue from './MetaDataSearchValue'

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

  test('uses the MetaDataValue when type is blank.', () => {
    const metadata = {
      label: 'test label',
      value: ['test value'],
    }
    const wrapper = shallow(<MetaDataField metadata={metadata} />)
    expect(wrapper.find(MetaDataValue)).toBeTruthy()
    expect(wrapper.find(MetaDataSearchValue)).toEqual({})
  })

  test('uses the MetaDataValue when type is list.', () => {
    const metadata = {
      label: 'test label',
      type: 'list',
      value: ['test value'],
    }
    const wrapper = shallow(<MetaDataField metadata={metadata} />)
    expect(wrapper.find(MetaDataValue)).toBeTruthy()
    expect(wrapper.find(MetaDataSearchValue)).toEqual({})
  })

  test('uses the MetaDataSearchValue when type is searchList.', () => {
    const metadata = {
      label: 'test label',
      type: 'list',
      value: ['test value'],
    }
    const wrapper = shallow(<MetaDataField metadata={metadata} />)
    expect(wrapper.find(MetaDataSearchValue)).toEqual({})
    expect(wrapper.find(MetaDataSearchValue)).toBeTruthy()
  })
})
