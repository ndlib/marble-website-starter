import React from 'react'
import { mount } from 'enzyme'
import { useStaticQuery } from 'gatsby'
import { Styled } from 'theme-ui'
import { Menu, findNavInData } from './'

console.error = jest.fn()

const sq = {
  site: {
    siteMetadata: {
      menus: [
        {
          id: 'nolabel',
          label: '',
          items: [
            {
              id: 'one',
              label: 'link1',
              link: '/link1',
            },
            {
              id: 'two',
              label: 'link2',
              link: '/link2',
            },
          ],
        },
        {
          id: 'label',
          label: 'label',
          items: [
            {
              id: 'one',
              label: 'link1',
              link: '/link1',
            },
            {
              id: 'two',
              label: 'link2',
              link: '/link2',
            },
          ],
        },
      ],
    },
  },
}
describe('Menu', () => {
  test('It renders the nav menu', () => {
    useStaticQuery.mockImplementationOnce(() => {
      return sq
    })
    const wrapper = mount(<Menu menu='nolabel' />)

    expect(wrapper.find('nav').exists()).toBeTruthy()
    expect(wrapper.find('Link')).toHaveLength(2)
    expect(wrapper.find('Link[to="/link1"]').prop('children')).toEqual('link1')
    expect(wrapper.find('Link[to="/link2"]').prop('children')).toEqual('link2')
  })

  test('It renders a menu with a label', () => {
    useStaticQuery.mockImplementationOnce(() => {
      return sq
    })
    const wrapper = mount(<Menu menu='label' />)

    expect(wrapper.find(Styled.h3).exists()).toBeTruthy()
    expect(wrapper.find(Styled.h3).text()).toEqual('label')
  })

  test('findNavInData finds the menu correctly', () => {
    // does it find the menu labeled nolabel
    expect(findNavInData('nolabel', sq.site.siteMetadata.menus)).toEqual(sq.site.siteMetadata.menus[0])
    expect(findNavInData('label', sq.site.siteMetadata.menus)).toEqual(sq.site.siteMetadata.menus[1])
    expect(findNavInData('not-there', sq.site.siteMetadata.menus)).toEqual(undefined)
  })

  test('menu not found', () => {
    useStaticQuery.mockImplementationOnce(() => {
      return sq
    })
    const wrapper = mount(<Menu menu='badlabel' />)
    expect(wrapper.find('nav').exists()).toBeFalsy()
  })
})
