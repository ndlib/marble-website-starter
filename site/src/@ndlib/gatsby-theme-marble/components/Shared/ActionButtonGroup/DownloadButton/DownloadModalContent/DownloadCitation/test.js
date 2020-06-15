import React from 'react'
import { shallow } from 'enzyme'
import DownloadCitation from './'
import { useStaticQuery } from 'gatsby'

describe('DownloadCitation', () => {
  test('Collection', () => {
    const manifest = {
      type: 'Collection',
      slug: 'item/slug',
      label: {
        en: ['Title'],
      },
      provider: [{
        homepage: [{
          label: {
            en: ['location'],
          },
        }],
      }],
    }
    useStaticQuery.mockImplementation(() => {
      return manifest
    })
    const wrapper = shallow(<DownloadCitation iiifManifest={manifest} />)
    expect(wrapper.find('.citation').text()).toEqual('Title, slug. location, Hesburgh Libraries, University of Notre Dame, South Bend, IN. /item/slug')
  })
  test('Snite Manifest', () => {
    const manifest = {
      type: 'Manifest',
      slug: 'item/slug',
      label: {
        en: ['Title'],
      },
      provider: [{
        homepage: [{
          label: {
            en: ['Snite Museum of Art'],
          },
        }],
      }],
      metadata: [{
        label:{
          en:['Creator'],
        },
        value:{
          en:['Creator'],
        },
      }, {
        label:{
          en:['Medium'],
        },
        value:{
          en:['Medium'],
        },
      }, {
        label:{
          en:['Credit Line'],
        },
        value:{
          en:['Credit Line'],
        },
      }, {
        label:{
          en:['Accession number'],
        },
        value:{
          en:['Accession number'],
        },
      }],
    }
    useStaticQuery.mockImplementation(() => {
      return manifest
    })
    const wrapper = shallow(<DownloadCitation iiifManifest={manifest} />)
    expect(wrapper.find('.citation').text()).toEqual('Creator, Title, Medium. Snite Museum of Art, University of Notre Dame. Credit Line, Accession number.')
  })
  test('RBSC Manifest', () => {
    const manifest = {
      type: 'Manifest',
      slug: 'item/slug',
      label: {
        en: ['Title'],
      },
      provider: [{
        homepage: [{
          label: {
            en: ['Rare Books and Special Collections'],
          },
        }],
      }],
      metadata: [{
        label:{
          en:['Creator'],
        },
        value:{
          en:['Creator'],
        },
      }, {
        label:{
          en:['Date'],
        },
        value:{
          en:['Date'],
        },
      }, {
        label:{
          en:['Collection'],
        },
        value:{
          en:['Collection'],
        },
      }],
    }
    useStaticQuery.mockImplementation(() => {
      return manifest
    })
    const wrapper = shallow(<DownloadCitation iiifManifest={manifest} />)
    expect(wrapper.find('.citation').text()).toEqual('Creator. Title, Date. Collection. Rare Books and Special Collections, Hesburgh Libraries, University of Notre Dame, South Bend, IN. /item/slug')
  })
})
