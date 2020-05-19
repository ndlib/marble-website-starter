import React from 'react'
import { shallow } from 'enzyme'
import PortfolioSettingsContent from './'
import * as PortfolioContext from 'context/PortfolioContext'
import SaveOrCancelButtons from 'components/App/Pages/Portfolio/PortfolioBody/SaveOrCancelButtons'
import MultiColumn from 'components/Shared/MultiColumn'
import Column from 'components/Shared/Column'
import VisibilitySettings from './VisibilitySettings'
import LayoutSettings from './LayoutSettings'
import DangerDelete from './DangerDelete'

test('PortfolioSettingsContent', () => {
  jest.spyOn(PortfolioContext, 'usePortfolioContext').mockImplementationOnce(() => {
    return {
      portfolio: {
        title: 'My Title',
      },
    }
  })
  const callBack = jest.fn()
  const wrapper = shallow(<PortfolioSettingsContent callBack={callBack} />)
  expect(wrapper.find(SaveOrCancelButtons).exists()).toBeTruthy()
  expect(wrapper.find(MultiColumn).exists()).toBeTruthy()
  expect(wrapper.find(Column).length).toEqual(2)
  expect(wrapper.find(VisibilitySettings).exists()).toBeTruthy()
  expect(wrapper.find(LayoutSettings).exists()).toBeTruthy()
  expect(wrapper.find(DangerDelete).exists()).toBeTruthy()
})
