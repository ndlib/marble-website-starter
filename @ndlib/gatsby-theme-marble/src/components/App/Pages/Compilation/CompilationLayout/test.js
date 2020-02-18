import React from 'react'
import { shallow } from 'enzyme'
import { navigate } from 'gatsby'
import CompilationLayout from './'
import Seo from 'components/Internal/Seo'
import * as Auth from 'utils/auth'

describe('CompilationLayout', () => {
  const props = {
    compilation: {
      user: {
        userName: 'fake_user',
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
    expect(wrapper.find(Seo).props().title).toEqual('test title')
  })
})
