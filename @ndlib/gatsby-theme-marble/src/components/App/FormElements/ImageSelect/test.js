import React from 'react'
import { shallow } from 'enzyme'
import ImageSelect from './'

describe('ImageSelect', () => {
  test('no images', () => {
    const props = {
      items: [],
      currentImage: '',
      fieldName: 'fieldName',
      onChange: () => jest.fn(),
    }
    const wrapper = shallow(<ImageSelect {...props} />)
    expect(wrapper.find('#fieldName').exists()).toBeTruthy()
    expect(wrapper.find('.imageOption').exists()).toBeFalsy()
  })

  test('images', () => {
    const props = {
      items: [
        {
          id: '000',
          image: '/img0.png',
        },
        {
          id: '001',
          image: '/img1.png',
        },
        {
          id: '002',
          image: '/img2.png',
        },
        {
          id: 'err',
        },
      ],
      currentImage: '/img1.png',
      fieldName: 'fieldName',
      onChange: () => jest.fn(),
    }
    const wrapper = shallow(<ImageSelect {...props} />)
    expect(wrapper.find('#fieldName').exists()).toBeTruthy()
    expect(wrapper.find('.imageOption').length).toEqual(3)
    expect(wrapper.find('input').at(0).props().defaultChecked).toBeFalsy()
    expect(wrapper.find('input').at(1).props().defaultChecked).toBeTruthy()
    expect(wrapper.find('input').at(2).props().defaultChecked).toBeFalsy()
    wrapper.find('input').at(2).simulate('change')
    expect(wrapper.find('input').at(1).props().defaultChecked).toBeFalsy()
    expect(wrapper.find('input').at(2).props().defaultChecked).toBeTruthy()
  })
})
