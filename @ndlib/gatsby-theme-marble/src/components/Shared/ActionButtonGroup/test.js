import React from 'react'
import { shallow } from 'enzyme'
import ActionButtonGroup from './'
import ActionButton from './ActionButton'

const print = jest.fn()
const window = global.window || {}
Object.defineProperty(window, 'print', print)

const manifest = {
  id: 'https://iiif.iiif',
  slug: 'item/3',
}
const wrapper = shallow(<ActionButtonGroup iiifManifest={manifest} />)

test('Renders 4 actions buttons and an wrapper', () => {
  expect(wrapper.find('actionButton')).toBeTruthy()
  expect(wrapper.find(ActionButton).length).toEqual(3)
})
