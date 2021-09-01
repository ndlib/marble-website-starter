import React from 'react'
import { mount } from 'enzyme'
import {
  MdOpenInNew,
  MdCollectionsBookmark,
  MdPictureAsPdf,
} from 'react-icons/md'
import CardBadge from './'

describe('CardBadge', () => {
  test('link', () => {
    const wrapper = mount(<CardBadge type='link' />)
    expect(wrapper.find(MdOpenInNew).exists()).toBeTruthy()
    expect(wrapper.find(MdCollectionsBookmark).exists()).toBeFalsy()
    expect(wrapper.find(MdPictureAsPdf).exists()).toBeFalsy()
  })
  test('collection', () => {
    const wrapper = mount(<CardBadge type='collection' />)
    expect(wrapper.find(MdOpenInNew).exists()).toBeFalsy()
    expect(wrapper.find(MdCollectionsBookmark).exists()).toBeTruthy()
    expect(wrapper.find(MdPictureAsPdf).exists()).toBeFalsy()
  })
  test('pdf', () => {
    const wrapper = mount(<CardBadge type='pdf' />)
    expect(wrapper.find(MdOpenInNew).exists()).toBeFalsy()
    expect(wrapper.find(MdCollectionsBookmark).exists()).toBeFalsy()
    expect(wrapper.find(MdPictureAsPdf).exists()).toBeTruthy()
  })
  test('notARealIcon', () => {
    console.error = jest.fn()
    const wrapper = mount(<CardBadge type='notARealIcon' />)
    expect(wrapper.find(MdOpenInNew).exists()).toBeFalsy()
    expect(wrapper.find(MdCollectionsBookmark).exists()).toBeFalsy()
    expect(wrapper.find(MdPictureAsPdf).exists()).toBeFalsy()
  })
})
