import React from 'react'
import { shallow } from 'enzyme'
import { act } from 'react-dom/test-utils'
import EditDescription from './'
import * as PortfolioContext from 'context/PortfolioContext'
import SaveOrCancelButtons from 'components/App/Pages/Portfolio/PortfolioBody/SaveOrCancelButtons'

test('TitleEdit', () => {
  const closeFunc = jest.fn()
  jest.spyOn(PortfolioContext, 'usePortfolioContext').mockImplementationOnce(() => {
    return {
      portfolio: {
        description: 'I wrote something.',
      },
    }
  })
  let wrapper
  act(() => {
    wrapper = shallow(<EditDescription closeFunc={closeFunc} />)
  })
  expect(wrapper.find('label').text()).toContain('Description')
  const input = wrapper.findWhere(c => {
    return c.props().name === 'portfolioDescription'
  })

  expect(input.props().defaultValue).toEqual('I wrote something.')
  expect(wrapper.find(SaveOrCancelButtons).exists()).toBeTruthy()

  act(() => {
    const e = {
      target: {
        value: '',
      },
    }
    input.props().onChange(e)
  })
})
