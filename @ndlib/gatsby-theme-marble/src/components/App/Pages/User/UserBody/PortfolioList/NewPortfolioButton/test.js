import React from 'react'
import { shallow } from 'enzyme'
import { navigate } from 'gatsby'
import { NewPortfolioButton, successFunc } from './'
import MaterialButton from 'components/Internal/MaterialButton'

describe('NewPortfolioButton', () => {
  test('layout', () => {
    const props = {
      addFunc: jest.fn(),
      loginReducer: {
        user: { uuid: 'asdf' },
      },
      portfolios: [],
    }
    const wrapper = shallow(<NewPortfolioButton {...props} />)
    expect(wrapper.find(MaterialButton).exists()).toBeTruthy()
  })

  test('successFunc', () => {
    const data = {
      uuid: 'asdf',
    }
    const addFunc = jest.fn()
    const portfolios = [{ uuid: '1' }, { uuid: '2' }]
    successFunc({
      data: data,
      portfolios: portfolios,
      addFunc: addFunc,
      setCreating: jest.fn(),
    })
    expect(navigate).toBeCalledWith('/myportfolio/asdf')
    expect(addFunc).toBeCalledWith([{ uuid: 'asdf' }, { uuid: '1' }, { uuid: '2' }])
  })
})
