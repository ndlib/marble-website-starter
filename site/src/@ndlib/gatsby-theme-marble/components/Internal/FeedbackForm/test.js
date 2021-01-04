import React from 'react'
import nock from 'nock'
import { shallow } from 'enzyme'
import { FeedbackForm } from './'
import MaterialButton from '@ndlib/gatsby-theme-marble/src/components/Internal/MaterialButton'
import TextField from '@ndlib/gatsby-theme-marble/src/components/App/FormElements/TextField'
import { createData, successFunc, errorFunc } from './api'

describe('FeedbackForm', () => {
  const wrapper = shallow(<FeedbackForm />)
  test('submit button disabled', () => {
    expect(wrapper.find(MaterialButton).prop('disabled')).toBe(true)
  })
  test('should validate the name field', () => {
    let textField = wrapper.findWhere((el) => el.type() === TextField && el.props().id === 'name')
    expect((textField).prop('valid')).toBe(false)
    textField.props().onChange({
      target: {
        name: 'changeName',
        value: 'Dude Man',
      },
    })
    textField = wrapper.findWhere((el) => el.type() === TextField && el.props().id === 'name')
    expect((textField).prop('valid')).toBe(true)
  })
  test('should validate the email field', () => {
    let textField = wrapper.findWhere((el) => el.type() === TextField && el.props().id === 'email')
    expect((textField).prop('valid')).toBe(false)
    textField.props().onChange({
      target: {
        name: 'changeEmail',
        value: 'fake@email.com',
      },
    })
    textField = wrapper.findWhere((el) => el.type() === TextField && el.props().id === 'email')
    expect((textField).prop('valid')).toBe(true)
  })
  test('should validate the feedback field', () => {
    let textArea = wrapper.findWhere((el) => el.props().id === 'feedback')
    expect((textArea).prop('valid')).toBe(false)
    textArea.props().onChange({
      target: {
        name: 'changeFeedback',
        value: 'This is the feedback',
      },
    })
    textArea = wrapper.findWhere((el) => el.props().id === 'feedback')
    expect((textArea).prop('valid')).toBe(true)
  })
})
describe('FeedbackForm', () => {
  test('should return serviceNow incident #', () => {
    const mockResponse = {
      result: {
        message: 'Incident created',
        number: 'INC12345678',
      },
    }
    const body = {
      name: 'Fake name',
      email: 'Fake email',
      feedback: 'Fake feedback',
      assignment_group: 'e7f56ce737044200f8b78ff1b3990e85',
    }
    nock('https://cors-anywhere.herokuapp.com/https://nddev.service-now.com/api')
      .post('/uond/anonymous_incident', { name: 'fake name', email: 'sfsdfs@df.com', feedback: 'good feeedback', assignment_group: 'e7f56ce737044200f8b78ff1b3990e85' })
      .reply(200, (mockResponse))
      .persist()

    createData(body, successFunc, errorFunc)
    const event = { preventDefault: () => jest.fn() }
    let wrapper = shallow(<FeedbackForm body={body} />)
    wrapper.find(MaterialButton).simulate('click', event)
    wrapper = shallow(<FeedbackForm body={body} />)
  })
})
