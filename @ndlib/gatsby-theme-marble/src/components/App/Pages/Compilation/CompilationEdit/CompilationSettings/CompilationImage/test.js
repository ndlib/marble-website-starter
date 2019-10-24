import React from 'react'
import { shallow } from 'enzyme'
import CompilationImage from './'
import ImageSelect from 'components/App/FormElements/ImageSelect'
import defaultImage from 'assets/images/noImage.svg'
describe('CompilationImage', () => {
  const props = {
    compilation: {
      items: [
        { id: '0', image: '/image1.png' },
        { id: '1', image: '/image2.png' },
      ],
    },
  }
  test('simulate change', () => {
    const wrapper = shallow(<CompilationImage {...props} />)
    expect(wrapper.find(ImageSelect).props().fieldName).toEqual('compilationImage')
    console.log = jest.fn()
    wrapper.find(ImageSelect).simulate('change')
  })

  test('include defaultImage', () => {
    props.compilation.items[1].image = defaultImage
    const wrapper = shallow(<CompilationImage {...props} />)
    expect(wrapper.find(ImageSelect).props().fieldName).toEqual('compilationImage')
  })
})
