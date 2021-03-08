import React from 'react'
import { shallow } from 'enzyme'
import MetaDataList from './'
import MetaDataField from './MetaDataField'

describe('MetaDataList', () => {
  test('metadata', () => {
    const metadata = [
      { label: 'a', value: ['a'], type: 'a' },
      { label: 'b', value: ['b'], type: 'b' },
      { label: 'c', value: ['c'], type: 'c' },
    ]
    const wrapper = shallow(<MetaDataList metadata={metadata} className='classy' />)
    expect(wrapper.find('dl.classy').exists()).toBeTruthy()
    expect(wrapper.find(MetaDataField).length).toEqual(3)
  })
  test('null', () => {
    const wrapper = shallow(<MetaDataList />)
    expect(wrapper.find(MetaDataField).exists()).toBeFalsy()
  })
})
