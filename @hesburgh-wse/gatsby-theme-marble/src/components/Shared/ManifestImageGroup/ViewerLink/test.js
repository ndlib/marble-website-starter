import React from 'react'
import { shallow } from 'enzyme'
import ViewerLink from './'
import Link from 'components/Internal/Link'

describe('ViewerLink', () => {
  const iiifManifest = {
    id: 'someId',
    slug: 'someSlug',
  }
  const className = 'myClass'
  const children = <div className='child' />
  test('mirador and 0 index', () => {
    const wrapper = shallow(<ViewerLink iiifManifest={iiifManifest} className={className} location={{}}>{children}</ViewerLink>)
    expect(wrapper.find(Link).props().to).toEqual('/someSlug/mirador?cv=0&view=default')
    expect(wrapper.find('.myClass').props().rel).toEqual('alternate')
  })
  test('universal viewer and nonzero index', () => {
    const wrapper = shallow(<ViewerLink iiifManifest={iiifManifest} className={className} location={{}} index={1} viewer='uv'>{children}</ViewerLink>)
    expect(wrapper.find(Link).props().to).toEqual('/viewer?manifest=someId&cv=1')
    expect(wrapper.find('.myClass').props().rel).toEqual('nofollow')
  })
})
