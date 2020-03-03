import React from 'react'
import { shallow } from 'enzyme'
import { NewPortfolioButton } from './'
import MaterialButton from 'components/Internal/MaterialButton'

test('NewPortfolioButton', () => {
  console.log = jest.fn()
  const onClickSpy = jest.spyOn(console, 'log')
  const props = {
    addFunc: jest.fn(),
    loginReducer: {
      user: { uuid: 'asdf' },
    },
    portfolios: [],
  }
  const wrapper = shallow(<NewPortfolioButton {...props} />)
  expect(wrapper.find(MaterialButton).exists()).toBeTruthy()
  wrapper.find(MaterialButton).simulate('click')
  expect(onClickSpy).toHaveBeenCalled()
})
