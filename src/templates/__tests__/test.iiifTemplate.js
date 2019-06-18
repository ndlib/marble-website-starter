import React from 'react'
import { shallow } from 'enzyme'
import { IIIFTemplate } from '../iiifTemplate'
import Collection from 'components/ManifestViews/Collection/'
import Item from 'components/ManifestViews/Item/'

describe('iiifTemplate', () => {
  const data = { iiifManifest: { id: 'manifest' } }
  const location = { object: 'object' }

  test('it renders the collection template', () => {
    const pageContext = { layout: 'sc:collection' }
    const wrapper = shallow(<IIIFTemplate data={data} pageContext={pageContext} location={location} />)
    expect(wrapper.find(Collection).exists()).toBeTruthy()
    expect(wrapper.find(Collection).prop('iiifManifest')).toEqual({ id: 'manifest' })
    expect(wrapper.find(Collection).prop('location')).toEqual({ object: 'object' })
  })

  test('it renders the item template', () => {
    const pageContext = { layout: 'manifest' }
    const wrapper = shallow(<IIIFTemplate data={data} pageContext={pageContext} location={location} />)
    expect(wrapper.find(Item).exists()).toBeTruthy()
    expect(wrapper.find(Item).prop('iiifManifest')).toEqual({ id: 'manifest' })
    expect(wrapper.find(Item).prop('location')).toEqual({ object: 'object' })
  })
})
