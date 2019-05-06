import React from 'react'
import { shallow } from 'enzyme'
import { ExhibitsPage } from '../exhibits'

test('it renders the exhibits page', () => {
  const data = {
    site: {
      siteMetadata: {
        exhibitions: [
          {
            id: '1',
            label: 'label1',
            image: 'image',
            link:  'http://link.com/',
          },
          {
            id: '2',
            label: 'label2',
            image: 'image2',
            link:  'http://link2.com/',
          },
        ],
      },
    },
  }

  const wrapper = shallow(<ExhibitsPage data={data} />)
  expect(wrapper.find('Layout').exists()).toBeTruthy()
  expect(wrapper.find('h1').text()).toEqual('Exhibits')

  expect(wrapper.find('Card').length).toEqual(2)
  expect(wrapper.find('Card[label="label1"]').prop('label')).toEqual('label1')
  expect(wrapper.find('Card[label="label1"]').prop('image')).toEqual('image')
  expect(wrapper.find('Card[label="label1"]').prop('target')).toEqual('http://link.com/')
})
