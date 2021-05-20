import React from 'react'
import { mount } from 'enzyme'
import { act } from 'react-dom/test-utils'
import ImagePager from './'
import MaterialButton from '@ndlib/gatsby-theme-marble/src/components/Shared/MaterialButton'

describe('ImagePager', () => {
  const sxStyle = {}
  const selected = 0
  const setSelected = jest.fn()

  test('no images', () => {
    const props = {
      sxStyle: sxStyle,
      images: [],
      selected: selected,
      setSelected: setSelected,
    }
    const wrapper = mount(<ImagePager {...props} />)
    expect(wrapper.find('div').exists()).toBeFalsy()
  })

  test('1 image', () => {
    const props = {
      sxStyle: sxStyle,
      images: ['image 1.jpg'],
      selected: selected,
      setSelected: setSelected,
    }
    const wrapper = mount(<ImagePager {...props} />)
    expect(wrapper.find('div').exists()).toBeFalsy()
  })

  test('2 or more images', () => {
    const props = {
      sxStyle: sxStyle,
      images: ['image 1.jpg', 'image 2.jpg', 'image 2.jpg'],
      selected: 1,
      setSelected: setSelected,
    }
    const wrapper = mount(<ImagePager {...props} />)
    expect(wrapper.find('div').exists()).toBeTruthy()

    // test select
    act(() => {
      const e = {
        target: {
          value: '32',
        },
      }
      wrapper.find('select').props().onChange(e)
      expect(setSelected).toHaveBeenCalledWith(32)
    })
    // test next
    act(() => {
      wrapper.find(MaterialButton).at(1).props().onClick()
      expect(setSelected).toHaveBeenCalledWith(2)
    })
    // test previous
    act(() => {
      wrapper.find(MaterialButton).at(0).props().onClick()
      expect(setSelected).toHaveBeenCalledWith(0)
    })
  })

  test('disabled buttons', () => {
    const props = {
      sxStyle: sxStyle,
      images: ['image 1.jpg', 'image 2.jpg'],
      selected: 0,
      setSelected: setSelected,
    }
    let wrapper = mount(<ImagePager {...props} />)
    expect(wrapper.find(MaterialButton).at(0).props().disabled).toEqual(true)
    expect(wrapper.find(MaterialButton).at(1).props().disabled).toEqual(false)

    props.selected = 1
    wrapper = mount(<ImagePager {...props} />)
    expect(wrapper.find(MaterialButton).at(0).props().disabled).toEqual(false)
    expect(wrapper.find(MaterialButton).at(1).props().disabled).toEqual(true)
  })
})
