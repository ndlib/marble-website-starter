import React from 'react'
import { shallow, mount } from 'enzyme'
import { useStaticQuery } from 'gatsby'
import ManifestCard, { figureOutChildren } from './'
import Card from 'components/Shared/Card'

describe('ManifestCard', () => {
  const sq = {
    allIiifJson: {
      nodes: [
        {
          id: 'someID',
          label: {
            none: ['label'],
          },
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

    const wrapper = shallow(<ManifestCard iiifManifest={'someID'} />)
    expect(wrapper.find(Card).props().label).toEqual('label')
    expect(wrapper.find(Card).props().target).toEqual('/slug-1')
  })

  test('not found', () => {
    console.error = jest.fn()
    console.warn = jest.fn()
    useStaticQuery.mockImplementationOnce(() => {
      return sq
    })

    const wrapper = shallow(<ManifestCard iiifManifest={'badID'} />)
    expect(wrapper.find(Card).exists()).toBeFalsy()
  })
})

describe('figureOutChildren', () => {
  const iiifManifest = {
    id: 'fancyId',
    summary: {
      en: [
        'In 1814 we took a little trip,',
        'Down the old Kentucky Valley and the mighty Mississip.',
        'We took a little bacon and we took a little beans,',
        'To fight the bloody British in the town of New Oreleans.',
      ],
    },
    metadata: [
      {
        label: {
          en: ['creator'],
        },
        value: {
          en: ['Johnny Horton', 'Andrew Jackson'],
        },
      },
      {
        label: {
          en: ['date'],
        },
        value: {
          en: ['1814'],
        },
      },
    ],
  }
  test('children', () => {
    const props = {
      children: <div className='child'>children are loud</div>,
    }
    const actual = figureOutChildren(props, iiifManifest, 'en')
    const wrapper = shallow(actual)
    expect(wrapper.find('.child').text()).toEqual('children are loud')
  })
  test('no children', () => {
    const props = {
      showCreator: true,
      showDate: true,
      showSummary: true,
    }
    const actual = figureOutChildren(props, iiifManifest, 'en')
    const wrapper = mount(actual)
    console.log(wrapper.debug())
    expect(wrapper.find('p').at(0).text()).toEqual('Johnny Horton, Andrew Jackson')
    expect(wrapper.find('p').at(1).text()).toEqual('1814')
    expect(wrapper.find('div').text()).toEqual('In 1814 we took a little trip,')
  })
})
