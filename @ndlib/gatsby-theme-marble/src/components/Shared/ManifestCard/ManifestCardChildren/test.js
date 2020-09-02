import React from 'react'
import { mount } from 'enzyme'
import ManifestCardChildren from './'

describe('ManifestCardChildren', () => {
  const item = {
    id: 'fancyId',
    description: 'In 1814 we took a little trip,',

    metadata: [
      {
        label: 'creator',
        value: ['Johnny Horton', 'Andrew Jackson'],
      },
      {
        label: 'date',
        value: ['1814'],
      },
    ],
  }
  test('children no additional', () => {
    const props = {
      showCreator: false,
      showDate: false,
      children: <div className='child'>children are loud</div>,
    }
    const wrapper = mount(<ManifestCardChildren parentProps={props} item={item} />)
    expect(wrapper.find('.child').text()).toEqual('children are loud')
  })

  test('children + additional', () => {
    const props = {
      showCreator: true,
      showDate: true,
      showSummary: false,
      children: <div className='child'>A song about an alligator.</div>,
    }
    const wrapper = mount(<ManifestCardChildren parentProps={props} item={item} />)
    expect(wrapper.find('p').at(0).html()).toContain('Johnny Horton<br>Andrew Jackson')
    expect(wrapper.find('p').at(1).text()).toEqual('1814')
    expect(wrapper.findWhere(c => {
      return c.text() === 'In 1814 we took a little trip,'
    }).exists()).toBeFalsy()
    expect(wrapper.find('.child').text()).toEqual('A song about an alligator.')
  })

  test('no children', () => {
    const props = {
      showCreator: true,
      showDate: true,
      showSummary: true,
    }
    const wrapper = mount(<ManifestCardChildren parentProps={props} item={item} />)
    expect(wrapper.find('p').at(0).html()).toContain('Johnny Horton<br>Andrew Jackson')
    expect(wrapper.find('p').at(1).text()).toEqual('1814')
    expect(wrapper.findWhere(c => {
      return c.text() === 'In 1814 we took a little trip,'
    }).exists()).toBeTruthy()
  })
})
