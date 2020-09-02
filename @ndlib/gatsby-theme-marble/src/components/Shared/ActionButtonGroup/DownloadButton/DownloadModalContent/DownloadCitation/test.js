import React from 'react'
import { shallow } from 'enzyme'
import DownloadCitation from './'
import { useStaticQuery } from 'gatsby'
import i18n from '@ndlib/gatsby-theme-marble/src/i18n/i18nextForTest'

describe('DownloadCitation', () => {
  test('NoCitation', () => {
    const manifest = {
      slug: 'item/slug',
    }
    useStaticQuery.mockImplementation(() => {
      return manifest
    })
    const wrapper = shallow(<DownloadCitation marbleItem={manifest} i18n={i18n} />)
    expect(wrapper).toEqual({})
  })
  test('Citation', () => {
    const manifest = {
      citation: 'The Citation',
    }
    useStaticQuery.mockImplementation(() => {
      return manifest
    })
    const wrapper = shallow(<DownloadCitation marbleItem={manifest} i18n={i18n} />)
    expect(wrapper.find('.citation').text()).toEqual('The Citation')
  })
})
