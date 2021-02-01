import React from 'react'
import { mount } from 'enzyme'
import ViewerLink from './'

describe('ViewerLink', () => {
  console.error = jest.fn()
  const marbleItem = {
    slug: '/item/someId',
    iiifUri: 'http://iiif.thing',
  }
  const className = 'myClass'
  const children = <div className='child' />

  test.skip('mirador and 0 index', () => {
    const wrapper = mount(<ViewerLink marbleItem={marbleItem} className={className} location={{}}>{children}</ViewerLink>)
    expect(wrapper.find('a').props().href).toEqual('/item/someId/mirador?cv=0&view=default')
    expect(wrapper.find('a').props().rel).toEqual('alternate')
  })
})
