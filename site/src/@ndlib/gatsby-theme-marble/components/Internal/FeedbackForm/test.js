import React from 'react'
import { shallow } from 'enzyme'
import { FeedbackForm } from './'
import MaterialButton from '@ndlib/gatsby-theme-marble/src/components/Internal/MaterialButton'

describe('FeedbackForm', () => {
  test('submit button disabled', () => {
    const wrapper = shallow(<FeedbackForm />)
    expect(wrapper.find(MaterialButton).prop('disabled')).toBe(true)
  })
})
