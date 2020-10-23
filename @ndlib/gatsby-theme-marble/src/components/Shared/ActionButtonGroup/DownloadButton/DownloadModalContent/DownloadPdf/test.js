import React from 'react'
import { mount } from 'enzyme'
import DownloadPdf from './'
import { BaseStyles } from 'theme-ui'

describe('DownloadPdf', () => {
  test('no pdfs', () => {
    const marbleItem = {
      childrenMarbleFile: [],
    }
    const wrapper = mount(<DownloadPdf marbleItem={marbleItem} />)
    expect(wrapper.find(BaseStyles).exists()).toBeFalsy()
  })
  test('actually has pdfs', () => {
    const marbleItem = {
      childrenMarbleFile: [
        { fileType: 'pdf', file: 'file.path', name: 'name' },
      ],
    }
    const wrapper = mount(<DownloadPdf marbleItem={marbleItem} />)
    expect(wrapper.find(BaseStyles).exists()).toBeTruthy()
    expect(wrapper.find('a').props().href).toEqual('file.path')
  })
})
