import React from 'react'
import { mount } from 'enzyme'
import ViewerLink from './'
import ViewerModal from './ViewerModal'

describe('ViewerLink', () => {
  console.error = jest.fn()
  const marbleItem = {
    title: 'Title',
    iiifUri: 'https://iiif.thing',
  }
  const children = <div className='child' />

  test('undefined viewer url', () => {
    const wrapper = mount(<ViewerLink marbleItem={marbleItem}>{children}</ViewerLink>)
    expect(wrapper.find('.child').exists()).toBeTruthy()
    expect(wrapper.find(ViewerModal).exists()).toBeFalsy()
  })

  test('default', () => {
    process.env.IIIF_VIEWER_URL = 'https://viewer.url/?='
    const wrapper = mount(<ViewerLink marbleItem={marbleItem}>{children}</ViewerLink>)
    expect(wrapper.find('.child').exists()).toBeTruthy()
    expect(wrapper.find(ViewerModal).exists()).toBeTruthy()
    expect(wrapper.find(ViewerModal).props().externalLink).toContain('https://viewer.url/?=')
    expect(wrapper.find(ViewerModal).props().externalLink).toContain(marbleItem.iiifUri)
    expect(wrapper.find(ViewerModal).props().externalLink).toContain('&cv=0')
    expect(wrapper.find(ViewerModal).props().externalLink).toContain('&view=default')
  })

  test('cv, global', () => {
    process.env.IIIF_VIEWER_URL = 'https://viewer.url/?='
    const wrapper = mount(<ViewerLink marbleItem={marbleItem} index={4} view='gallery'>{children}</ViewerLink>)
    expect(wrapper.find('.child').exists()).toBeTruthy()
    expect(wrapper.find(ViewerModal).exists()).toBeTruthy()
    expect(wrapper.find(ViewerModal).props().externalLink).toContain('https://viewer.url/?=')
    expect(wrapper.find(ViewerModal).props().externalLink).toContain(marbleItem.iiifUri)
    expect(wrapper.find(ViewerModal).props().externalLink).toContain('&cv=4')
    expect(wrapper.find(ViewerModal).props().externalLink).toContain('&view=gallery')
  })
})
