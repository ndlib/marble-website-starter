import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import MaterialButton from 'components/Internal/MaterialButton'
import { createData } from 'utils/api'

export const NewPortfolioButton = ({ portfolios, addFunc, loginReducer }) => {
  const [creating, setCreating] = useState(false)
  return (
    <MaterialButton
      onClick={
        () => {
          setCreating(true)
          createData({
            loginReducer: loginReducer,
            contentType: 'collection',
            id: loginReducer.user.uuid,
            body: {
              title: 'My Portfolio',
              description: null,
              image: null,
              layout: 'default',
              privacy: 'private',
            },
            successFunc: (data) => {
              const ps = [...portfolios]
              ps.unshift(data)
              addFunc(ps)
              setCreating(false)
            },
            errorFunc: (e) => {
              console.error(e)
            },
          })
        }
      }
      wide
      disabled={creating}
    >Create New Portfolio</MaterialButton>
  )
}

NewPortfolioButton.propTypes = {
  addFunc: PropTypes.func.isRequired,
  portfolios: PropTypes.array.isRequired,
  loginReducer: PropTypes.object.isRequired,
}

export const mapStateToProps = (state) => {
  return { ...state }
}
export default connect(
  mapStateToProps,
)(NewPortfolioButton)
