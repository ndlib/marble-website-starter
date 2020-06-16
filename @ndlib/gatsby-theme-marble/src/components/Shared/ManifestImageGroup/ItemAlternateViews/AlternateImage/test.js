import React from 'react'
import { shallow } from 'enzyme'
import AlternateImage from './'
import ViewerLink from 'components/Shared/ManifestImageGroup/ViewerLink'
import Image from 'components/Shared/Image'
import AlternateOverlay from './AlternateOverlay'

const ndJson = {
  id: 'id',
  iiifUri: 'http://iiif.url',
  items: [
    { iiifImageUri: 'http://image.here/1' },
    { iiifImageUri: 'http://image.here/2' },
  ],
}
const location = {}
describe('AlternateImage', () => {
  test('length == 1', () => {
    const wrapper = shallow(<AlternateImage ndJson={ndJson} index={1} max={5} length={1} location={location} />)

    expect(wrapper.find(ViewerLink).exists()).toBeFalsy()
    expect(wrapper.find(AlternateOverlay).exists()).toBeFalsy()
    expect(wrapper.find(Image).exists()).toBeFalsy()
  })

  test('length > 1', () => {
    const wrapper = shallow(<AlternateImage ndJson={ndJson} index={1} max={5} length={4} location={location} />)

    expect(wrapper.find(ViewerLink).exists()).toBeTruthy()
    expect(wrapper.find(AlternateOverlay).exists()).toBeTruthy()
    expect(wrapper.find(Image).exists()).toBeTruthy()
  })
})
