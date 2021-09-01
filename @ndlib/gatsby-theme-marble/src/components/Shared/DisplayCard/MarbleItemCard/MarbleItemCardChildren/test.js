import React from 'react'
import { mount } from 'enzyme'
import MarbleItemCardChildren from './'

describe('MarbleItemCardChildren', () => {
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
      {
        label: 'collectionName',
        value: ['The Spectacular Johnny Horton'],
      },
    ],
  }
  test('children no additional', () => {
    const props = {
      children: <div className='child'>children are loud</div>,
    }
    const wrapper = mount(<MarbleItemCardChildren parentProps={props} />)
    expect(wrapper.find('.child').text()).toEqual('children are loud')
  })

  test('children + additional', () => {
    const props = {
      children: <div className='child'>A song about an alligator.</div>,
    }
    const wrapper = mount(<MarbleItemCardChildren parentProps={props} creator={item.metadata[0].value} date={item.metadata[1].value} collectionName={item.metadata[2].value} />)
    expect(wrapper.find('p').at(0).html()).toContain('Johnny Horton<br>Andrew Jackson')
    expect(wrapper.find('p').at(1).text()).toEqual('1814')
    expect(wrapper.find('p').at(2).text()).toEqual('Part of: The Spectacular Johnny Horton')
    expect(wrapper.findWhere(c => {
      return c.text() === 'In 1814 we took a little trip,'
    }).exists()).toBeFalsy()
    expect(wrapper.find('.child').text()).toEqual('A song about an alligator.')
  })

  test('no children', () => {
    const props = { children: item.description }
    const wrapper = mount(<MarbleItemCardChildren parentProps={props} creator={item.metadata[0].value} date={item.metadata[1].value} />)
    expect(wrapper.find('p').at(0).html()).toContain('Johnny Horton<br>Andrew Jackson')
    expect(wrapper.find('p').at(1).text()).toEqual('1814')
    expect(wrapper.findWhere(c => {
      return c.text() === 'In 1814 we took a little trip,'
    }).exists()).toBeTruthy()
  })
})
