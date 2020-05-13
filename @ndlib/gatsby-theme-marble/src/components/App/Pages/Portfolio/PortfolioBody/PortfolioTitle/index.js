/** @jsx jsx */
import React, { useState, useContext } from 'react'
import { Styled, jsx } from 'theme-ui'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import TextField from 'components/App/FormElements/TextField'
import { patchData } from 'utils/api'
import { PortfolioContext } from '../'

// eslint-disable-next-line complexity
const PortfolioTitle = ({ isOwner, loginReducer }) => {
  const { portfolio, updatePortfolio } = useContext(PortfolioContext)
  const [title, setTitle] = useState(portfolio.title)
  const [newTitle, setNewTitle] = useState(portfolio.title)
  const [editing, setEditing] = useState(false)
  const [patching, setPatching] = useState(false)
  const [valid, setValid] = useState(true)

  let editButton = null
  if (isOwner) {
    editButton = (
      <button
        onClick={() => {
          setEditing(true)
          if (title !== '') {
            setValid(true)
          }
        }}
      >Edit</button>
    )
  }
  if (editing) {
    return (
      <React.Fragment>
        <TextField
          id='portfolioName'
          label='Title'
          defaultValue={newTitle}
          onChange={(event) => {
            setValid(event.target.value !== '')
            setNewTitle(event.target.value)
          }}
          disabled={patching}
        />
        <button
          onClick={() => {
            if (valid) {
              setPatching(true)
              const body = { title: newTitle }
              setTitle(body.title)
              patchData({
                loginReducer: loginReducer,
                contentType: 'collection',
                id: portfolio.uuid,
                body: body,
                successFunc: (result) => {
                  updatePortfolio(result)
                  setEditing(false)
                  setPatching(false)
                },
                errorFunc: (e) => {
                  console.error(e)
                },
              })
            }
          }}

          disabled={!valid || patching || title === newTitle}
        >Save</button>
        <button
          onClick={() => {
            setEditing(false)
            setNewTitle(title)
          }}
          disabled={patching}
        >Cancel</button>
        {
          valid ? null : <div>Invalid Title</div>
        }
      </React.Fragment>
    )
  }
  return (
    <React.Fragment>
      <Styled.h1>{title}</Styled.h1>
      {editButton}
    </React.Fragment>
  )
}

PortfolioTitle.propTypes = {
  isOwner: PropTypes.bool,
  loginReducer: PropTypes.object.isRequired,
}
export const mapStateToProps = (state) => {
  return { ...state }
}

export default connect(
  mapStateToProps,
)(PortfolioTitle)
