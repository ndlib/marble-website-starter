import React from 'react'
import { mount } from 'enzyme'
import { act } from 'react-dom/test-utils'
import DownloadImage from './'
import ImagePreview from './ImagePreview'
import ImagePager from './ImagePager'
import ImageSettings from './ImageSettings'
import MaterialButton from 'components/Internal/MaterialButton'
import * as download from 'utils/download'

console.error = jest.fn()

describe('DownloadImage', () => {
  test('no images', () => {
    const iiifManifest = {}
    const wrapper = mount(<DownloadImage iiifManifest={iiifManifest} />)
    expect(wrapper.find(ImagePreview).exists()).toBeFalsy()
    expect(wrapper.find(ImagePager).exists()).toBeFalsy()
    expect(wrapper.find(ImageSettings).exists()).toBeFalsy()
  })

  test('images', () => {
    const downloadSpy = jest.spyOn(download, 'download')
    const iiifManifest = {
      type: 'manifest',
      items: [{
        items: [{
          items: [{
            body: {
              id: 'image.image',
            },
          }],
        }],
      }],
    }
    const images = ['image.image']
    const wrapper = mount(<DownloadImage iiifManifest={iiifManifest} />)
    expect(wrapper.find(ImagePreview).props().images).toEqual(images)
    expect(wrapper.find(ImagePager).props().images).toEqual(images)
    expect(wrapper.find(ImageSettings).exists()).toBeTruthy()
    act(() => {
      wrapper.find(MaterialButton).props().onClick()
    })
    expect(downloadSpy).toHaveBeenCalled()
  })
})
