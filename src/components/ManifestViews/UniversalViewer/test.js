import React from 'react'
import { shallow } from 'enzyme'
import UniversalViewer from './'
import Layout from 'components/Layout'
import PrivateRoute from 'components/Layout/PrivateRoute/'
import SkipToMain from 'components/Layout/PageWrapper/SkipToMain'
import SEO from 'components/Shared/Seo'
describe('UniversalViewer', () => {
  const data = {
    site: {
      siteMetadata: {
        universalViewerBaseURL: 'http://test.com',
      },
    },
  }

  test('no query param or manifest', () => {
    const wrapper = shallow(<UniversalViewer data={data} location={{}} requireLogin={false} />)
    expect(wrapper.find(Layout).props().children).toEqual('The requested manifest could not be found.')
  })

  test('query param', () => {
    const location = {
      search: '?manifest=http://my-manifest.json&cv=200',
    }
    const wrapper = shallow(<UniversalViewer data={data} location={location} requireLogin={false} />)
    expect(wrapper.find(PrivateRoute).props().location).toEqual(location)
    expect(wrapper.find(PrivateRoute).props().requireLogin).toEqual(false)
    expect(wrapper.find(SkipToMain).exists()).toBeTruthy()
    expect(wrapper.find(SEO).props().title).toEqual('http://my-manifest.json | 200 | Universal Viewer')
    expect(wrapper.find('#mainContent').exists()).toBeTruthy()
    expect(wrapper.find('iframe').props().src).toEqual('http://test.com#?manifest=http://my-manifest.json&cv=200')
  })

  test('manifest', () => {
    const manifest = 'http://test.json'
    const location = {}
    const wrapper = shallow(<UniversalViewer data={data} location={{}} manifest={manifest} requireLogin={false} />)
    expect(wrapper.find(PrivateRoute).props().location).toEqual(location)
    expect(wrapper.find(PrivateRoute).props().requireLogin).toEqual(false)
    expect(wrapper.find(SkipToMain).exists()).toBeTruthy()
    expect(wrapper.find(SEO).props().title).toEqual('http://test.json | 0 | Universal Viewer')
    expect(wrapper.find('#mainContent').exists()).toBeTruthy()
    expect(wrapper.find('iframe').props().src).toEqual('http://test.com#?manifest=http://test.json&cv=0')
  })
})
