import * as React from 'react'
// import { render, screen } from '@testing-library/react'
import { shallow } from 'enzyme'
import Form from './'

test('allows you to submit a feedback response', () => {
  const name = 'Jimmy'
  const wrapper = shallow(<Form />)
  expect(wrapper.find('name').text()).toEqual('Jimmy')
})
