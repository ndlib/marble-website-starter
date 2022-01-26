import React from 'react'
import { mount } from 'enzyme'
import { useStaticQuery } from 'gatsby'
import ManifestImageGroup from './'
import ViewerLink from './ViewerLink'
import ExpandIcon from './ExpandIcon'
import ItemAlternateViews from './ItemAlternateViews'
import noImage from 'assets/images/noImage.svg'

console.error = jest.fn()

describe('ManifestImageGroup', () => {
  const sq = {
    allFile: {
      nodes: [],
    },
    marbleConfiguration: {
      iiifViewerUrl: 'https://viewer.url/?=',
    },
  }
  test('image', () => {
    useStaticQuery.mockImplementationOnce(() => {
      return sq
    })
    const marbleItem = {
      id: 'id',
      slug: 'slug',
      title: 'title',
      description: '',
      defaultImage: { default: 'https://default.image' },
      metadata: [
        {
          label: 'Classification',
          value: ['sculptures'],
        },
      ],
    }
    const allMarbleFile = {
      nodes: [
        {
          name: 'someImage',
          iiif: {
            service: 'http://image.place',
            default: 'http://image.default',
          },
          fileType: 'image',
        },
      ],
    }
    const wrapper = mount(<ManifestImageGroup marbleItem={marbleItem} location={{}} allMarbleFile={allMarbleFile} />)
    expect(wrapper.find('section').exists()).toBeTruthy()
    expect(wrapper.find(ViewerLink).exists()).toBeTruthy()
    expect(wrapper.find(ExpandIcon).exists()).toBeTruthy()
    expect(wrapper.findWhere(img => {
      return img.prop('src') === 'https://default.image'
    }).exists()).toBeTruthy()
    expect(wrapper.findWhere(img => {
      return img.prop('alt') === 'This is called title within the category of sculptures.'
    }).exists()).toBeTruthy()
    expect(wrapper.find(ItemAlternateViews).exists()).toBeTruthy()
  })

  test('manifest, no image', () => {
    useStaticQuery.mockImplementationOnce(() => {
      return sq
    })
    const wrapper = mount(<ManifestImageGroup marbleItem={{ id: 'id' }} location={{}} />)
    expect(wrapper.find('section').exists()).toBeTruthy()
    expect(wrapper.find(ViewerLink).exists()).toBeTruthy()
    expect(wrapper.find(ExpandIcon).exists()).toBeTruthy()
    expect(wrapper.findWhere(img => {
      return img.prop('src') === noImage
    }).exists()).toBeTruthy()
    expect(wrapper.find(ItemAlternateViews).exists()).toBeTruthy()
  })

  test('no manifest', () => {
    useStaticQuery.mockImplementationOnce(() => {
      return sq
    })
    const wrapper = mount(<ManifestImageGroup location={{}} />)
    expect(wrapper.find('section').exists()).toBeFalsy()
    expect(wrapper.find(ViewerLink).exists()).toBeFalsy()
    expect(wrapper.find(ExpandIcon).exists()).toBeFalsy()
    expect(wrapper.find('img').exists()).toBeFalsy()
    expect(wrapper.find(ItemAlternateViews).exists()).toBeFalsy()
  })
})
