import React from 'react'
import { shallow } from 'enzyme'
import NewCompilationButton from './'
import MaterialButton from 'components/Internal/MaterialButton'

test('NewCompilationButton', () => {
  console.log = jest.fn()
  const onClickSpy = jest.spyOn(console, 'log')
  const wrapper = shallow(<NewCompilationButton />)
  expect(wrapper.find(MaterialButton).exists()).toBeTruthy()
  wrapper.find(MaterialButton).simulate('click')
  expect(onClickSpy).toHaveBeenCalled()
})
