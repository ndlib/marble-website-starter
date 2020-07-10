import React from 'react'
import { shallow } from 'enzyme'
import DownloadCitation from './'
import { useStaticQuery } from 'gatsby'

describe('DownloadCitation', () => {
  test('NoCitation', () => {
    const manifest = {
      slug: 'item/slug',
    }
    useStaticQuery.mockImplementation(() => {
      return manifest
    })
    const wrapper = shallow(<DownloadCitation marbleItem={manifest} />)
    expect(wrapper).toEqual({})
  })
  test('Citation', () => {
    const manifest = {
      citation: 'The Citation',
    }
    useStaticQuery.mockImplementation(() => {
      return manifest
    })
    const wrapper = shallow(<DownloadCitation marbleItem={manifest} />)
    expect(wrapper.find('.citation').text()).toEqual('The Citation')
  })
})
