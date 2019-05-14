import React from 'react'
import { shallow } from 'enzyme'
import UniversalViewerLayout from './'
import Layout from 'components/Layout'
import PrivateRoute from 'components/Layout/PrivateRoute/'
import SkipToMain from 'components/Layout/PageWrapper/SkipToMain'
import SEO from 'components/Shared/Seo'
describe('UniversalViewerLayout', () => {
  const data = {
    site: {
      siteMetadata: {
        universalViewerBaseURL: 'http://test.com',
      },
    },
  }

  test('no query param or manifest', () => {
    const wrapper = shallow(<UniversalViewerLayout data={data} location={{}} requireLogin={false} />)
    expect(wrapper.find(Layout).props().children).toEqual('Not Found')
  })

  test('query param', () => {
    const location = {
      search: '?manifest=http://my-manifest.json&cv=200',
    }
    const wrapper = shallow(<UniversalViewerLayout data={data} location={location} requireLogin={false} />)
    expect(wrapper.find(PrivateRoute).props().location).toEqual(location)
    expect(wrapper.find(PrivateRoute).props().requireLogin).toEqual(false)
    expect(wrapper.find(SkipToMain).exists()).toBeTruthy()
    expect(wrapper.find(SEO).props().title).toEqual('Universal Viewer')
    expect(wrapper.find('#mainContent').exists()).toBeTruthy()
    expect(wrapper.find('iframe').props().src).toEqual('http://test.com#?manifest=http://my-manifest.json&cv=200')
  })

  test('manifest', () => {
    const manifest = 'http://test.json'
    const location = {}
    const wrapper = shallow(<UniversalViewerLayout data={data} location={{}} manifest={manifest} requireLogin={false} />)
    expect(wrapper.find(PrivateRoute).props().location).toEqual(location)
    expect(wrapper.find(PrivateRoute).props().requireLogin).toEqual(false)
    expect(wrapper.find(SkipToMain).exists()).toBeTruthy()
    expect(wrapper.find(SEO).props().title).toEqual('Universal Viewer')
    expect(wrapper.find('#mainContent').exists()).toBeTruthy()
    expect(wrapper.find('iframe').props().src).toEqual('http://test.com#?manifest=http://test.json&cv=0')
  })
})
