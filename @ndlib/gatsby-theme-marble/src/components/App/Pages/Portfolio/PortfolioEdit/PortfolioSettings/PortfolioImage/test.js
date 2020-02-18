import React from 'react'
import { shallow } from 'enzyme'
import PortfolioImage from './'
import ImageSelect from 'components/App/FormElements/ImageSelect'
import defaultImage from 'assets/images/noImage.svg'
describe('PortfolioImage', () => {
  const props = {
    portfolio: {
      items: [
        { id: '0', image: '/image1.png' },
        { id: '1', image: '/image2.png' },
      ],
    },
  }
  test('simulate change', () => {
    const wrapper = shallow(<PortfolioImage {...props} />)
    expect(wrapper.find(ImageSelect).props().fieldName).toEqual('portfolioImage')
    console.log = jest.fn()
    wrapper.find(ImageSelect).simulate('change')
  })

  test('include defaultImage', () => {
    props.portfolio.items[1].image = defaultImage
    const wrapper = shallow(<PortfolioImage {...props} />)
    expect(wrapper.find(ImageSelect).props().fieldName).toEqual('portfolioImage')
  })
})
