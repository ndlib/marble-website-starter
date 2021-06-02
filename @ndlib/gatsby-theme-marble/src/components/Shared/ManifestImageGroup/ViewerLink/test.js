import React from 'react'
import { mount } from 'enzyme'
import { useStaticQuery } from 'gatsby'
import ViewerLink from './'
import ActionModal from 'components/Shared/ActionModal'

describe('ViewerLink', () => {
  console.error = jest.fn()

  const marbleItem = {
    title: 'Title',
    iiifUri: 'https://iiif.thing',
  }



  const children = <div className='child' />

  test('undefined viewer url', () => {
    useStaticQuery.mockImplementationOnce(() => {
      return {
        marbleConfiguration: {
          iiifViewerUrl: null
        }
      }
    })
    const wrapper = mount(<ViewerLink marbleItem={marbleItem}>{children}</ViewerLink>)
    expect(wrapper.find('.child').exists()).toBeTruthy()
    expect(wrapper.find(ActionModal).exists()).toBeFalsy()
  })

  test('default', () => {
    useStaticQuery.mockImplementationOnce(() => {
      return {
        marbleConfiguration: {
          iiifViewerUrl: 'https://viewer.url/?='
        }
      }
    })
    const wrapper = mount(<ViewerLink marbleItem={marbleItem}>{children}</ViewerLink>)
    expect(wrapper.find('.child').exists()).toBeTruthy()
    expect(wrapper.find(ActionModal).exists()).toBeTruthy()
    expect(wrapper.find(ActionModal).props().externalLink).toContain('https://viewer.url/?=')
    expect(wrapper.find(ActionModal).props().externalLink).toContain(marbleItem.iiifUri)
    expect(wrapper.find(ActionModal).props().externalLink).toContain('&cv=0')
    expect(wrapper.find(ActionModal).props().externalLink).toContain('&view=default')
  })

  test('cv, global', () => {
    useStaticQuery.mockImplementationOnce(() => {
      return {
        marbleConfiguration: {
          iiifViewerUrl: 'https://viewer.url/?='
        }
      }
    })
    const wrapper = mount(<ViewerLink marbleItem={marbleItem} index={4} view='gallery'>{children}</ViewerLink>)
    expect(wrapper.find('.child').exists()).toBeTruthy()
    expect(wrapper.find(ActionModal).exists()).toBeTruthy()
    expect(wrapper.find(ActionModal).props().externalLink).toContain('https://viewer.url/?=')
    expect(wrapper.find(ActionModal).props().externalLink).toContain(marbleItem.iiifUri)
    expect(wrapper.find(ActionModal).props().externalLink).toContain('&cv=4')
    expect(wrapper.find(ActionModal).props().externalLink).toContain('&view=gallery')
  })
})
