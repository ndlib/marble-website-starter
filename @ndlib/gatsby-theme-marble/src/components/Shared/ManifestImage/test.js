import React from 'react'
import { shallow } from 'enzyme'
import ManifestImage from './'
import Image from 'components/Shared/Image'
describe('ManifestImage', () => {
  const iiifManifest = {
    description: 'Manifest Description',
    name: 'Manifest Name',
  }
  const className = 'myClass'
  test('props from manifest', () => {
    const wrapper = shallow(<ManifestImage iiifManifest={iiifManifest} className={className} />)

    expect(wrapper.find(Image).props().title).toEqual('Manifest Name')
  })
  test('props from props', () => {
    const wrapper = shallow(<ManifestImage iiifManifest={iiifManifest} className={className} title='propTitle' alt='propAlt' />)

    expect(wrapper.find(Image).props().title).toEqual('propTitle')
  })
})
