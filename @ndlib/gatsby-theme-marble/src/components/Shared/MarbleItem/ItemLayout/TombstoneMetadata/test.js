import React from 'react'
import { mount } from 'enzyme'
import TombstoneMetadata from './'

describe('TombstoneMetadata', () => {
  test('Creator value is null', () => {
    const item = {
      id: 'ABC123',
      description: 'How the Grinch Stole Christmas',
      metadata: [
        {
          label: 'Date',
          value: ['1957'],
        },
      ],
    }
    const wrapper = mount(<TombstoneMetadata marbleItem={item} />)
    expect(wrapper.find('div').at(1).html()).toContain('1957')
  })
  test('Creator value equals unknown', () => {
    const item = {
      id: 'ABC123',
      description: 'How the Grinch Stole Christmas',
      metadata: [
        {
          label: 'Creator',
          value: ['unknown'],
        },
        {
          label: 'Date',
          value: ['1957'],
        },
      ],
    }
    const wrapper = mount(<TombstoneMetadata marbleItem={item} />)
    expect(wrapper.find('div').at(1).html()).toContain('Unknown creator')
  })

  test('item has Creator', () => {
    const item = {
      id: 'ABC123',
      description: 'How the Grinch Stole Christmas',
      metadata: [
        {
          label: 'Creator',
          value: ['Dr. Seuss'],
        },
        {
          label: 'Date',
          value: ['1957'],
        },
      ],
    }
    const wrapper = mount(<TombstoneMetadata marbleItem={item} />)
    expect(wrapper.find('div').at(1).html()).toContain('Dr. Seuss')
  })

  test('item has collection', () => {
    const item = {
      id: 'ABC123',
      description: 'How the Grinch Stole Christmas',
      metadata: [
        {
          label: 'Creator',
          value: ['Dr. Seuss'],
        },
        {
          label: 'Date',
          value: ['1957'],
        },
      ],
      marbleParent: {
        title: 'PARENT',
        slug: '/item/parent',
      },
    }
    const wrapper = mount(<TombstoneMetadata marbleItem={item} />)
    expect(wrapper.find('div').at(3).text()).toContain('Part of: PARENT')
  })
})
