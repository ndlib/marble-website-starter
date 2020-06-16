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
    const ndJson = {
      level: 'manifest',
      items: [{
        iiifImageUri: 'http://image.place/1',
      }],
    }
    const images = ['http://image.place/1/full/full/0/default.jpg']
    const wrapper = mount(<DownloadImage ndJson={ndJson} />)
    expect(wrapper.find(ImagePreview).props().images).toEqual(images)
    expect(wrapper.find(ImagePager).props().images).toEqual(images)
    expect(wrapper.find(ImageSettings).exists()).toBeTruthy()
    act(() => {
      wrapper.find(MaterialButton).props().onClick()
    })
    expect(downloadSpy).toHaveBeenCalled()
  })
})
