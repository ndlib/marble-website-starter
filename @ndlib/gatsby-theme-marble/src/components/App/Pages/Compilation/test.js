import React from 'react'
import { shallow } from 'enzyme'
import * as TestedFile from './'
import CompilationLayout from './CompilationLayout'
import CompilationView from './CompilationView'
import CompilationEdit from './CompilationEdit'
import CompilationUnavailable from './CompilationUnavailable'
import * as Auth from 'utils/auth'
import * as Utils from 'utils/appUtils'

const { Compilation } = TestedFile
describe('Compilation', () => {
  const props = {
    compilationId: '1',
    edit: null,
    location: {},
    loginReducer: {},
  }
  test('unavailable', () => {
    const wrapper = shallow(<Compilation {...props} />)
    expect(wrapper.find(CompilationUnavailable).exists()).toBeTruthy()
  })
  test('regular view', () => {
    jest.spyOn(Utils, 'getCompilation').mockImplementationOnce(() => {
      return {}
    })
    jest.spyOn(Auth, 'ownsPage').mockImplementationOnce(() => true)
    jest.spyOn(TestedFile, 'shouldShow').mockImplementationOnce(() => true)

    const wrapper = shallow(<Compilation {...props} />)
    expect(wrapper.find(CompilationLayout).exists()).toBeTruthy()
    expect(wrapper.find(CompilationView).exists()).toBeTruthy()
  })
  test('edit view', () => {
    props.edit = true
    jest.spyOn(Utils, 'getCompilation').mockImplementationOnce(() => {
      return {}
    })
    jest.spyOn(Auth, 'ownsPage').mockImplementationOnce(() => true)
    jest.spyOn(TestedFile, 'shouldShow').mockImplementationOnce(() => true)

    const wrapper = shallow(<Compilation {...props} />)
    expect(wrapper.find(CompilationLayout).exists()).toBeTruthy()
    expect(wrapper.find(CompilationEdit).exists()).toBeTruthy()
  })
})
