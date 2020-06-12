import React from 'react'
import { shallow } from 'enzyme'
import DownloadCitation from './'

describe('DownloadCitation', () => {

  test('Unrendered', () => {
    const manifest = {}
    const wrapper = shallow(<DownloadCitation iiifManifest={manifest} />)
    expect(wrapper.find('.citation').text()).toEqual('Unable to render citation')
  })
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
    const wrapper = shallow(<DownloadCitation iiifManifest={manifest} />)
    expect(wrapper.find('.citation').text()).toEqual('Title, slug. location, Hesburgh Libraries, University of Notre Dame, South Bend, IN. ' +
      window.location.href)
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
    const wrapper = shallow(<DownloadCitation iiifManifest={manifest} />)
    expect(wrapper.find('.citation').text()).toEqual('Creator, Title, Medium. Snite Museum of Art, University of Notre Dame. Credit Line, Accession number.')
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
    const wrapper = shallow(<DownloadCitation iiifManifest={manifest} />)
    expect(wrapper.find('.citation').text()).toEqual('Creator. Title, Date. Collection. Rare Books and Special Collections, Hesburgh Libraries, University of Notre Dame, South Bend, IN.' +
      window.location.href)
  })
})
