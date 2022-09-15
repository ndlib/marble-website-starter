import React from 'react'
import { mount } from 'enzyme'
import { Menu } from './'

console.error = jest.fn()

const sq = {
  allMenusJson: {
    nodes: [
      {
        menuId: 'nolabel',
        label: '',
        items: [
          {
            menuId: 'one',
            label: 'link1',
            link: '/link1',
          },
          {
            menuId: 'two',
            label: 'link2',
            link: '/link2',
          },
        ],
      },
      {
        menuId: 'label',
        label: 'label',
        items: [
          {
            menuId: 'one',
            label: 'link1',
            link: '/link1',
          },
          {
            menuId: 'two',
            label: 'link2',
            link: '/link2',
          },
        ],
      },
    ],
  },
}
describe('Menu', () => {
  test('It renders the nav menu', () => {
    const items = sq.allMenusJson.nodes[0].items
    const wrapper = mount(<Menu variant='nolabel' items={items} />)

    expect(wrapper.find('nav').exists()).toBeTruthy()
    expect(wrapper.find('Link')).toHaveLength(2)
    expect(wrapper.find('Link[to="/link1"]').prop('children')).toEqual('link1')
    expect(wrapper.find('Link[to="/link2"]').prop('children')).toEqual('link2')
  })

  test('It renders a menu with a label', () => {
    const wrapper = mount(<Menu variant='label' items={[]} label='label' />)

    expect(wrapper.find('h3').exists()).toBeTruthy()
    expect(wrapper.find('h3').text()).toEqual('label')
  })

  test('it adds the variant to the nav', () => {
    // not sure how to do this yet since sx gets translated to a random css in the output
    const wrapper = mount(<Menu variant='variant' items={[]} label='' />)
  })
})
