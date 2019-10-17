import React from 'react'
import { shallow } from 'enzyme'
import { navigate } from 'gatsby'
import CompilationLayout from './'
import * as Auth from 'utils/auth'
import Layout from 'components/Layout'

describe('CompilationLayout', () => {
  const props = {
    compilation: {
      user: {
        username: 'fake_user',
      },
      id: '1',
      title: 'test title',
    },
    edit: true,
    location: {},
    loginReducer: {},
  }
  test('redirect', () => {
    jest.spyOn(Auth, 'ownsPage').mockImplementationOnce(() => false)
    shallow(<CompilationLayout {...props}><div className='childDiv' /></CompilationLayout>)
    expect(navigate).toHaveBeenCalledWith('/compilation/1')
  })
  test('display', () => {
    jest.spyOn(Auth, 'ownsPage').mockImplementationOnce(() => true)
    const wrapper = shallow(<CompilationLayout {...props}><div className='childDiv' /></CompilationLayout>)
    expect(wrapper.find(Layout).props().title).toEqual('test title')
  })
})
