import React from 'react'
import { mount } from 'enzyme'
import ViewerLink from './'

describe('ViewerLink', () => {
  console.error = jest.fn()
  const ndJson = {
    id: 'someId',
    iiifUri: 'http://iiif.thing',
  }
  const className = 'myClass'
  const children = <div className='child' />

  test('mirador and 0 index', () => {
    const wrapper = mount(<ViewerLink ndJson={ndJson} className={className} location={{}}>{children}</ViewerLink>)
    expect(wrapper.find('a').props().href).toEqual('/item/someId/mirador?cv=0&view=default')
    expect(wrapper.find('a').props().rel).toEqual('alternate')
  })

  test('universal viewer and nonzero index', () => {
    const wrapper = mount(<ViewerLink ndJson={ndJson} className={className} location={{}} index={1} viewer='uv'>{children}</ViewerLink>)
    expect(wrapper.find('a').props().href).toEqual('/viewer?manifest=http%3A%2F%2Fiiif.thing&cv=1')
    expect(wrapper.find('a').props().rel).toEqual('nofollow')
  })
})
