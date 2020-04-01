import React from 'react'
import { shallow } from 'enzyme'
import { useStaticQuery } from 'gatsby'
import HelpLink from './'

test('HelpLink', () => {
  useStaticQuery.mockImplementationOnce(() => {
    return {
      site: {
        siteMetadata: {
          iiifHelpURL: 'http://help.iiif',
        },
      },
    }
  })
  const wrapper = shallow(<HelpLink />)
  console.log(wrapper.debug())
  expect(wrapper.find('EmotionCssPropInternal').prop('href')).toEqual('http://help.iiif')
})
