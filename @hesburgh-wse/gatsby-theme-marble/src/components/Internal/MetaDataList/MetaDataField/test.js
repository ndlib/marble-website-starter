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
    expect(wrapper.find(MetaDataLabel).props().labels).toEqual([])
    expect(wrapper.find(MetaDataValue).props().values).toEqual([])
  })

  test('metadata', () => {
    const metadata = {
      label: {
        none: ['test label'],
      },
      value: {
        none: ['test value'],
      },
    }
    const wrapper = shallow(<MetaDataField metadata={metadata} />)
    expect(wrapper.find(MetaDataLabel).props().labels).toEqual(['test label'])
    expect(wrapper.find(MetaDataValue).props().values).toEqual(['test value'])
  })
})
