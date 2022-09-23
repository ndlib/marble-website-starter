/** @jsx jsx */
import { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { jsx } from 'theme-ui'
import { savePortfolioCollectionQuery } from 'utils/api'
import sx from './sx'

const defaultTitle = 'My Portfolio'

// eslint-disable-next-line complexity
export const AddNewPortfolio = ({ portfolios, addFunc, loginReducer }) => {
  const [editable, setEditable] = useState(false)
  const [error, setError] = useState(false)
  const [creating, setCreating] = useState(false)
  const [title, setTitle] = useState(defaultTitle)
  const [valid, setValid] = useState(true)
  if (!editable) {
    return (
      <button
        className='add-button'
        onClick={(e) => {
          e.preventDefault()
          setEditable(true)
        }}
        sx={sx.createButton}
      >Create A New Portfolio
      </button>
    )
  }
  if (error) {
    return (
      <button
        className='error-button'
        onClick={() => setError(false)}
        sx={sx.errorButton}
      >An error occured.
      </button>
    )
  }
  return (
    <div
      sx={sx.wrapper}
    >
      <label htmlFor={title}>
        <input
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
          }}
          type='text'
          disabled={creating}
          defaultValue={title}
          onChange={(event) => {
            setValid(event.target.value !== '')
            setTitle(event.target.value)
          }}
          aria-label={title}
          sx={valid ? sx.input : sx.inputInvalid}
        />
      </label>
      <button
        className='submit-button'
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          setCreating(true)
          const portfolio = {
            title: title,
            privacy: 'private',
            layout: 'default',
            description: null,
            imageUri: null,
          }
          savePortfolioCollectionQuery({
            loginReducer: loginReducer,
            portfolio: portfolio,
          })
            .then((data) => {
              const ps = [...portfolios]
              ps.unshift(data)
              addFunc(ps)
              setCreating(false)
              setEditable(false)
              setTitle(defaultTitle)
            })

            .catch((e) => {
              console.error(e)
              setError(true)
            })
        }}
        disabled={creating || !valid}
        sx={creating || !valid ? sx.submitButtonDisabled : sx.submitButton}
      >create
      </button>
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
