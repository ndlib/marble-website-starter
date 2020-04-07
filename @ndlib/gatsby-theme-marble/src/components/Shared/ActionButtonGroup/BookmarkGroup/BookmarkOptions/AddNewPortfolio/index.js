/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { jsx } from 'theme-ui'
import { createData } from 'utils/api'
import sx from './sx'

const defaultTitle = 'My Portfolio'

export const AddNewPortfolio = ({ portfolios, addFunc, loginReducer }) => {
  const [editable, setEditable] = useState(false)
  const [error, setError] = useState(false)
  const [creating, setCreating] = useState(false)
  const [title, setTitle] = useState(defaultTitle)
  if (!editable) {
    return (
      <button
        className='add-button'
        onClick={() => setEditable(true)}
        sx={sx.createButton}
      >Create A New Portfolio</button>
    )
  }
  if (error) {
    return (
      <button
        className='error-button'
        onClick={() => setError(false)}
        sx={sx.errorButton}
      >An error occured.</button>
    )
  }
  return (
    <div
      sx={sx.wrapper}
    >
      <input
        type='text'
        disabled={creating}
        defaultValue={title}
        onChange={(event) => {
          setTitle(event.target.value)
        }}
        sx={sx.input}
      />
      <button
        className='submit-button'
        onClick={
          () => {
            setCreating(true)
            createData({
              loginReducer: loginReducer,
              contentType: 'collection',
              id: loginReducer.user.uuid,
              body: {
                title: title,
                description: null,
                image: null,
                layout: 'default',
                privacy: 'private',
              },
              successFunc: (data) => successFunc({
                data: data,
                portfolios: portfolios,
                addFunc: addFunc,
                setCreating: setCreating,
                setEditable: setEditable,
                setTitle: setTitle,
              }),
              errorFunc: (e) => {
                console.error(e)
                setError(true)
              },
            })
          }
        }
        disabled={creating}
        sx={sx.submitButton}
      >create</button>
    </div>
  )
}

AddNewPortfolio.propTypes = {
  addFunc: PropTypes.func.isRequired,
  portfolios: PropTypes.array.isRequired,
  loginReducer: PropTypes.object.isRequired,
}

export const mapStateToProps = (state) => {
  return { ...state }
}
export default connect(
  mapStateToProps,
)(AddNewPortfolio)

export const successFunc = ({ data, portfolios, addFunc, setCreating, setEditable, setTitle }) => {
  const ps = [...portfolios]
  ps.unshift(data)
  addFunc(ps)
  setCreating(false)
  setEditable(false)
  setTitle(defaultTitle)
}
