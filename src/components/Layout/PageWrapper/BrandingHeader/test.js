import React from 'react'
import { shallow } from 'enzyme'
import { BrandingHeader } from './'
import LinkedLogo from './LinkedLogo'

describe('BrandingHeader', () => {
  test('name brand', () => {
    const data = {
      allFile: {
        edges: [
          {
            node: {
              name: 'departmentLogo',
              publicURL: '/pic1.jpg',
            },
          },
          {
            node: {
              name: 'institutionLogo',
              publicURL: '/pic2.jpg',
            },
          },
        ],
      },
      site: {
        siteMetadata: {
          institutionURL: 'http://test.org',
          institutionLabel: 'inst label',
          departmentURL: 'http://test.com',
          departmentLabel: 'dept label',
          headerColor: 'green',
          useBrandBar: true,
        },
      },
    }
    const wrapper = shallow(<BrandingHeader data={data} />)
    console.log(wrapper.debug())
    expect(wrapper.find('.wrapper').exists()).toBeTruthy()
    expect(wrapper.find(LinkedLogo).length).toEqual(2)
  })
  test('brand x', () => {
    const data = {
      site: {
        siteMetadata: {
        },
      },
    }
    const wrapper = shallow(<BrandingHeader data={data} />)
    expect(wrapper.find('.wrapper').exists()).toBeFalsy()
  })
})
