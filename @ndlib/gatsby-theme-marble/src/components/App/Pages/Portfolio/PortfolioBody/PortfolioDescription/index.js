/** @jsx jsx */
import React, { useContext, useState } from 'react'
import { jsx } from 'theme-ui'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import CalloutBox from 'components/Shared/CalloutBox'
import TextArea from 'components/App/FormElements/TextArea'
import { patchData } from 'utils/api'
import { PortfolioContext } from '../'

// eslint-disable-next-line complexity
const PortfolioDescription = ({ isOwner, loginReducer }) => {
  const { portfolio, updatePortfolio } = useContext(PortfolioContext)
  const [editing, setEditing] = useState(false)
  const [patching, setPatching] = useState(false)
  const [description, setDescription] = useState(portfolio.description)
  const [newDescription, setNewDescription] = useState(portfolio.description)
  let editButton = null
  if (isOwner) {
    editButton = (
      <button
        onClick={() => {
          setEditing(true)
        }}
      >Edit</button>
    )
  }
  if (editing) {
    return (
      <React.Fragment>
        <TextArea
          id='PortfolioDescription'
          label='Description'
          defaultValue={newDescription}
          onChange={(event) => {
            setNewDescription(event.target.value)
          }}
          disabled={patching}
        />
        <button
          onClick={() => {
            setPatching(true)
            const body = { description: newDescription }
            setDescription(body.description)
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
          }}

          disabled={patching || description === newDescription}
        >Save</button>
        <button
          onClick={() => {
            setEditing(false)
            setNewDescription(description)
          }}
          disabled={patching}
        >Cancel</button>
      </React.Fragment>
    )
  }
  if (description === '' || description === null) {
    if (isOwner) {
      return (
        <button
          onClick={() => {
            setEditing(true)
          }}
        >Add a description</button>
      )
    }
    return null
  }
  return (
    <div>
      <CalloutBox>
        <p>{portfolio.description}</p>
      </CalloutBox>
      {editButton}
    </div>
  )
}

PortfolioDescription.propTypes = {
  isOwner: PropTypes.bool,
  loginReducer: PropTypes.object.isRequired,
}
export const mapStateToProps = (state) => {
  return { ...state }
}

export default connect(
  mapStateToProps,
)(PortfolioDescription)
