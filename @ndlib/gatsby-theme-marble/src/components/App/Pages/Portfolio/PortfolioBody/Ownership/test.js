import React from 'react'
import { shallow } from 'enzyme'
import { Ownership } from './'
import VisibilityLabel from 'components/Internal/VisibilityLabel'
import UserCartouche from 'components/Internal/UserCartouche'

console.error = jest.fn()
describe('Ownership', () => {
  test('isOwner', () => {
    const wrapper = shallow(<Ownership isOwner />)
    expect(wrapper.find(VisibilityLabel).exists()).toBeTruthy()
  })

  test('not isOwner', () => {
    const wrapper = shallow(<Ownership />)
    expect(wrapper.find(UserCartouche).exists()).toBeTruthy()
  })
})
