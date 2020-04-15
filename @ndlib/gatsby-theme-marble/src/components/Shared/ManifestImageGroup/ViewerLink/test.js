import React from 'react'
import { mount } from 'enzyme'
import ViewerLink from './'

describe('ViewerLink', () => {
  console.error = jest.fn()
  const iiifManifest = {
    id: 'someId',
    slug: 'someSlug',
  }
  const className = 'myClass'
  const children = <div className='child' />
  test('mirador and 0 index', () => {
    const wrapper = mount(<ViewerLink iiifManifest={iiifManifest} className={className} location={{}}>{children}</ViewerLink>)
    expect(wrapper.find('a').props().href).toEqual('/someSlug/mirador?cv=0&view=default')
    expect(wrapper.find('a').props().rel).toEqual('alternate')
  })
  test('universal viewer and nonzero index', () => {
    const wrapper = mount(<ViewerLink iiifManifest={iiifManifest} className={className} location={{}} index={1} viewer='uv'>{children}</ViewerLink>)
    expect(wrapper.find('a').props().href).toEqual('/viewer?manifest=someId&cv=1')
    expect(wrapper.find('a').props().rel).toEqual('nofollow')
  })
})
