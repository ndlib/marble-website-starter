import React from 'react'
import { mount } from 'enzyme'
import { act } from 'react-dom/test-utils'
import DownloadImage from './'
import ImagePreview from './ImagePreview'
import ImagePager from './ImagePager'
import ImageSettings from './ImageSettings'
import * as download from 'utils/download'

console.error = jest.fn()

describe('DownloadImage', () => {
  test('no images', () => {
    const marbleItem = {}
    const wrapper = mount(<DownloadImage marbleItem={marbleItem} />)
    expect(wrapper.find(ImagePreview).exists()).toBeFalsy()
    expect(wrapper.find(ImagePager).exists()).toBeFalsy()
    expect(wrapper.find(ImageSettings).exists()).toBeFalsy()
  })

  test('images', () => {
    const downloadSpy = jest.spyOn(download, 'download')
    const marbleItem = {
      childrenMarbleFile: [{
        fileType: 'image',
        iiif: { service: 'http://image.place/1' },
      }],
    }
    const images = marbleItem.childrenMarbleFile
    const wrapper = mount(<DownloadImage marbleItem={marbleItem} />)
    expect(wrapper.find(ImagePreview).props().images).toEqual(images)
    expect(wrapper.find(ImagePager).props().images).toEqual(images)
    expect(wrapper.find(ImageSettings).exists()).toBeTruthy()
    act(() => {
      wrapper.find('button').props().onClick()
    })
    expect(downloadSpy).toHaveBeenCalled()
  })
})
