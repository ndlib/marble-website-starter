import React from 'react'
import { shallow, mount } from 'enzyme'
import { useStaticQuery } from 'gatsby'
import ManifestCard, { figureOutChildren } from './'
import Card from 'components/Shared/Card'

describe('ManifestCard', () => {
  const sq = {
    allMarbleItem: {
      nodes: [
        {
          iiifUri: 'someID',
          title: 'label',
          metadata: [
          ],
          slug: 'slug-1',
        },
      ],
    },
  }

  test('found', () => {
    console.error = jest.fn()
    useStaticQuery.mockImplementationOnce(() => {
      return sq
    })

    const wrapper = shallow(<ManifestCard iiifManifest='someID' />)
    expect(wrapper.find(Card).props().label).toEqual('label')
    expect(wrapper.find(Card).props().target).toEqual('/slug-1')
  })

  test('not found', () => {
    console.error = jest.fn()
    console.warn = jest.fn()
    useStaticQuery.mockImplementationOnce(() => {
      return sq
    })

    const wrapper = shallow(<ManifestCard iiifManifest='badID' />)
    expect(wrapper.find(Card).exists()).toBeFalsy()
  })
})

describe('figureOutChildren', () => {
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
    const actual = figureOutChildren(props, item)
    const wrapper = mount(actual)
    expect(wrapper.find('.child').text()).toEqual('children are loud')
  })

  test('children + additional', () => {
    const props = {
      showCreator: true,
      showDate: true,
      showSummary: false,
      children: <div className='child'>A song about an alligator.</div>,
    }
    const actual = figureOutChildren(props, item)
    const wrapper = mount(actual)
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
    const actual = figureOutChildren(props, item)
    const wrapper = mount(actual)
    expect(wrapper.find('p').at(0).html()).toContain('Johnny Horton<br>Andrew Jackson')
    expect(wrapper.find('p').at(1).text()).toEqual('1814')
    expect(wrapper.findWhere(c => {
      return c.text() === 'In 1814 we took a little trip,'
    }).exists()).toBeTruthy()
  })
})
