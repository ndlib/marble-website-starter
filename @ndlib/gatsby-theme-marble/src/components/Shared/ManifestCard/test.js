import React from 'react'
import { shallow } from 'enzyme'
import { useStaticQuery } from 'gatsby'
import ManifestCard from './'
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
