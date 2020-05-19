import React from 'react'
import { shallow } from 'enzyme'
import { Ownership } from './'
import * as PC from 'context/PortfolioContext'
import VisibilityLabel from 'components/Internal/VisibilityLabel'
import UserCartouche from 'components/Internal/UserCartouche'

describe('Ownership', () => {
  test('isOwner', () => {
    jest.spyOn(PC, 'usePortfolioContext').mockImplementationOnce(() => {
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
    jest.spyOn(PC, 'usePortfolioContext').mockImplementationOnce(() => {
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
