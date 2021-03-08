import React from 'react'
import { shallow } from 'enzyme'
import { navigate } from 'gatsby'
import EditUserButton from './'
import MaterialButton from 'components/Shared/MaterialButton'
import i18n from '@ndlib/gatsby-theme-marble/src/i18n/i18nextForTest'

test('EditUserButton', () => {
  const wrapper = shallow(<EditUserButton userName='captainuser' i18n={i18n} />)
  expect(wrapper.find(MaterialButton).html()).toContain('button.userEdit')
  wrapper.find(MaterialButton).simulate('click')
  expect(navigate).toHaveBeenCalledWith('/user/captainuser/edit')
})
