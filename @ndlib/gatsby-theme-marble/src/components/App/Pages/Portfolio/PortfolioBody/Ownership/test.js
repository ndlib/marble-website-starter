import React from 'react'
import { shallow } from 'enzyme'
import Ownership from './'
import * as PortfolioContext from 'context/PortfolioContext'
import VisibilityLabel from 'components/Shared/VisibilityLabel'
import UserCartouche from 'components/Shared/UserCartouche'

describe('Ownership', () => {
  test('isOwner', () => {
    jest.spyOn(PortfolioContext, 'usePortfolioContext').mockImplementationOnce(() => {
      return {
        portfolio: {
          privacy: 'public',
        },
      }
    })
    const wrapper = shallow(<Ownership isOwner />)
    expect(wrapper.find(VisibilityLabel).props().visibility).toEqual('public')
  })

  test('not isOwner', () => {
    jest.spyOn(PortfolioContext, 'usePortfolioContext').mockImplementationOnce(() => {
      return {
        portfolio: {
          userId: 'pete',
        },
      }
    })
    const wrapper = shallow(<Ownership />)
    expect(wrapper.find(UserCartouche).props().user).toEqual({ uuid: 'pete' })
  })
})
