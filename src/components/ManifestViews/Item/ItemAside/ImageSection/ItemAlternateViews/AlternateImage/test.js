import React from 'react'
import { shallow } from 'enzyme'
import AlternateImage from './'
import Link from 'components/Shared/Link'
import Image from 'components/Shared/Image'
import AlternateOverlay from './AlternateOverlay'

const manifest = {
  id: 'id',
}

describe('AlternateImage', () => {
  test('length == 1', () => {
    const wrapper = shallow(<AlternateImage iiifManifest={manifest} index={1} max={5} length={1} />)

    expect(wrapper.find(Link).exists()).toBeFalsy()
    expect(wrapper.find(AlternateOverlay).exists()).toBeFalsy()
    expect(wrapper.find(Image).exists()).toBeFalsy()
  })

  test('lenght > 1', () => {
    const wrapper = shallow(<AlternateImage iiifManifest={manifest} index={1} max={5} length={4} />)

    expect(wrapper.find(Link).props().to).toEqual(`/viewer?manifest=id&cv=1`)
    expect(wrapper.find(AlternateOverlay).exists()).toBeTruthy()
    expect(wrapper.find(Image).exists()).toBeTruthy()
  })
})
