import React from 'react'
import { mount } from 'enzyme'
import { useStaticQuery } from 'gatsby'
import ShareModalContent, { onClick } from './'

describe('ShareModalContent', () => {
  const copyFunc = jest.fn()
  beforeEach(() => {
    Object.defineProperty(global.document, 'execCommand', { value: copyFunc })
  })
  test('render', () => {
    const path = 'item/1'
    const sq = {
      site: {
        siteMetadata: {
          siteUrl: 'http://example.com',
        },
      },
    }
    useStaticQuery.mockImplementation(() => {
      return sq
    })

    const wrapper = mount(<ShareModalContent path={path} />)
    expect(wrapper.find('input').props().value).toEqual('http://example.com/item/1')
    expect(wrapper.find('button').exists()).toBeTruthy()
    expect(wrapper.find('svg').exists()).toBeTruthy()
    expect(wrapper.find('em').exists()).toBeFalsy()
  })

  test('onClick', () => {
    const ref = {
      current: {
        select: jest.fn(),
        focus: jest.fn(),
      },
    }
    const callbackFunc = jest.fn()
    onClick(ref, callbackFunc)
    expect(ref.current.select).toHaveBeenCalled()
    expect(copyFunc).toHaveBeenCalledWith('copy')
    expect(ref.current.focus).toHaveBeenCalled()
    expect(callbackFunc).toHaveBeenCalledWith(true)
  })
})
