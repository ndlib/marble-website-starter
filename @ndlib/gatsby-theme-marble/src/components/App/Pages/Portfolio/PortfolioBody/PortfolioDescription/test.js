import React from 'react'
import { shallow } from 'enzyme'
import { act } from 'react-dom/test-utils'
import PortfolioDescription from './'
import MaterialButton from 'components/Shared/MaterialButton'
import * as PortfolioContext from 'context/PortfolioContext'
import EditButton from 'components/App/Pages/Portfolio/PortfolioBody/EditButton'
import EditDescription from './EditDescription'
describe('PortfolioDescription', () => {
  test('isOwner, blank description', () => {
    jest.spyOn(PortfolioContext, 'usePortfolioContext').mockImplementationOnce(() => {
      return {
        portfolio: {
          description: '',
        },
      }
    })
    let wrapper
    act(() => {
      wrapper = shallow(<PortfolioDescription isOwner />)
    })
    expect(wrapper.find(MaterialButton).exists()).toBeTruthy()
    expect(wrapper.find(EditButton).exists()).toBeFalsy()

    act(() => wrapper.find(MaterialButton).props().onClick())

    expect(wrapper.find(EditDescription).exists()).toBeTruthy()
  })

  test('isOwner, description', () => {
    jest.spyOn(PortfolioContext, 'usePortfolioContext').mockImplementationOnce(() => {
      return {
        portfolio: {
          description: 'Some text',
        },
      }
    })
    let wrapper
    act(() => {
      wrapper = shallow(<PortfolioDescription isOwner />)
    })
    expect(wrapper.find(EditButton).exists()).toBeTruthy()
    expect(wrapper.find(MaterialButton).exists()).toBeFalsy()
    act(() => wrapper.find(EditButton).props().setEditFunc())

    expect(wrapper.find(EditDescription).exists()).toBeTruthy()
  })

  test('not isOwner, blank description', () => {
    jest.spyOn(PortfolioContext, 'usePortfolioContext').mockImplementationOnce(() => {
      return {
        portfolio: {
          description: '',
        },
      }
    })
    let wrapper
    act(() => {
      wrapper = shallow(<PortfolioDescription />)
    })
    expect(wrapper.find('div').exists()).toBeFalsy()
    expect(wrapper.find(MaterialButton).exists()).toBeFalsy()
    expect(wrapper.find(EditButton).exists()).toBeFalsy()
  })
})
