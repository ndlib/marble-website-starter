import React from 'react'
import { shallow } from 'enzyme'
import ShareButton from './'
import ActionButton from 'components/Shared/ActionButtonGroup/ActionButton'
import ActionModal from 'components/Internal/ActionModal'
import ShareModalContent from './ShareModalContent'
import share from 'assets/icons/svg/baseline-share-24px.svg'

test('ShareButton', () => {
  const wrapper = shallow(<ShareButton path='somewhere' />)
  expect(wrapper.find(ActionButton).props().icon).toEqual(share)
  expect(wrapper.find(ActionButton).props().name).toEqual('Share')
  expect(wrapper.find(ActionModal).props().contentLabel).toEqual('Share')
  expect(wrapper.find(ShareModalContent).props().path).toEqual('somewhere')
})
