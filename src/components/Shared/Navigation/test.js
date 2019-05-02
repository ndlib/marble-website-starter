import React from 'react'
import { shallow } from 'enzyme'
import { Navigation, findNavInData } from './'
import Link from 'components/Shared/Link'

const data = {
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
      ]
    },
  },
}

test('It renders the nav menu', () => {
  const wrapper = shallow(<Navigation menu={data.site.siteMetadata.menus[0]} />)

  expect(wrapper.find('nav').exists()).toBeTruthy()
  expect(wrapper.find('Link')).toHaveLength(2)
  expect(wrapper.find('Link[to="/link1"]').prop('children')).toEqual('link1')
  expect(wrapper.find('Link[to="/link2"]').prop('children')).toEqual('link2')
})

test('It renders a menu with a label', () => {
  const wrapper = shallow(<Navigation menu={data.site.siteMetadata.menus[1]} />)

  expect(wrapper.find('h3').exists()).toBeTruthy()
  expect(wrapper.find('h3').text()).toEqual('label')
})

test('findNavInData finds the menu correctly', () => {
  // does it find the menu labeled nolabel
  expect(findNavInData('nolabel', data.site.siteMetadata.menus)).toEqual(data.site.siteMetadata.menus[0])
  expect(findNavInData('label', data.site.siteMetadata.menus)).toEqual(data.site.siteMetadata.menus[1])
  expect(findNavInData('not-there', data.site.siteMetadata.menus)).toEqual(undefined)
})

test('it allows for a class name to be passed into the object', () => {
  const wrapper = shallow(<Navigation menu={data.site.siteMetadata.menus[0]} navClass='the-class' />)
  expect(wrapper.find('nav').prop('className')).toEqual('the-class')
})
