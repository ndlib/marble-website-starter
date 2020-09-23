import React from 'react'
import { shallow } from 'enzyme'
import { act } from 'react-dom/test-utils'
import { Trans } from 'react-i18next'
import NoUser from './'

test('NoUser renders', () => {
  const user = 'Anonymous'
  let wrapper
  act(() => {
    wrapper = shallow(<NoUser userName={user} />)
  })
  expect(wrapper.find(Trans).exists()).toBeTruthy()
})
