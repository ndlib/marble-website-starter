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
          label: 'Creator',
          value: [''],
        },
        {
          label: 'Date',
          value: ['1957'],
        },
      ],
    }
    const wrapper = mount(<TombstoneMetadata marbleItem={item} />)
    expect(wrapper.find('div').at(2).html()).toContain('?creator[0]=\"')
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
    expect(wrapper.find('div').at(2).html()).toContain('Unknown creator')
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
    expect(wrapper.find('div').at(2).html()).toContain('Dr. Seuss')
  })
})
