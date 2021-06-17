import React from 'react'
import { shallow } from 'enzyme'
import { NDBrandBreadcrumbs } from './'

test('Breadcrumb add home link', () => {
  const test = { variant: 'breadcrumb', to: '/', children: 'Home' }
  const bcs = []

  const wrapper = shallow(<NDBrandBreadcrumbs breadcrumbs={bcs} currentPageTitle='page-title' />)
  expect(wrapper.find('li').first().find('Link').props()).toEqual(test)
})

test('Breadcrumb adds middle levels', () => {
  const test = { variant: 'breadcrumb', to: 'middle', children: 'middle' }
  const bcs = [{ url: 'middle', title: 'middle' }]

  const wrapper = shallow(<NDBrandBreadcrumbs breadcrumbs={bcs} currentPageTitle='page-title' />)
  expect(wrapper.find('li').at(1).find('Link').props()).toEqual(test)
})

test('adds title to the end of the breadcrumbs', () => {
  const test = { children:  ['page-title', ' › '] }
  const bcs = []

  const wrapper = shallow(<NDBrandBreadcrumbs breadcrumbs={bcs} currentPageTitle='page-title' />)
  expect(wrapper.find('li').last().props()).toEqual(test)
})

test('truncates the titles at :_([', () => {
  const longTitle = 'superlong title that will get split at : because that is what we want.'
  const test = { children:  ['superlong title that will get split at', ' › '] }
  const bcs = []

  const wrapper = shallow(<NDBrandBreadcrumbs breadcrumbs={bcs} currentPageTitle={longTitle} />)
  expect(wrapper.find('li').last().props()).toEqual(test)
})

test('truncates the titles at 60 chars if there are no split points', () => {
  const longTitle = 'super long title that should get split somewhere because that is what we want.'
  const test = { children:  ['super long title that should get split somewhere because...', ' › '] }
  const bcs = []

  const wrapper = shallow(<NDBrandBreadcrumbs breadcrumbs={bcs} currentPageTitle={longTitle} />)
  expect(wrapper.find('li').last().props()).toEqual(test)
})

test('truncates the titles at 60 chars and trims space if the 60th char is a space', () => {
  const longTitle = 'superlong title that will get split because that is what we want.'
  const test = { children:  ['superlong title that will get split because that is what we...', ' › '] }
  const bcs = []

  const wrapper = shallow(<NDBrandBreadcrumbs breadcrumbs={bcs} currentPageTitle={longTitle} />)
  expect(wrapper.find('li').last().props()).toEqual(test)
})

test('truncates the titles at 60 chars even if it has already split at a special character', () => {
  const longTitle = 'superlong title that will get split because that is what we want : with a special char.'
  const test = { children:  ['superlong title that will get split because that is what we...', ' › '] }
  const bcs = []

  const wrapper = shallow(<NDBrandBreadcrumbs breadcrumbs={bcs} currentPageTitle={longTitle} />)
  expect(wrapper.find('li').last().props()).toEqual(test)
})
