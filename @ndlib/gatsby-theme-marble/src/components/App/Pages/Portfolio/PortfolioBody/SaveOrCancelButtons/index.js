/** @jsx jsx */
import React, { useContext } from 'react'
import { jsx } from 'theme-ui'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { patchData } from 'utils/api'
import MaterialButton from 'components/Internal/MaterialButton'
import { PortfolioContext } from 'components/App/Pages/Portfolio/PortfolioBody'

// eslint-disable-next-line complexity
const SaveOrCancelButtons = ({
  closeFunc,
  patching,
  setPatching,
  body,
  valid,
  changed,
  loginReducer,
}) => {
  const { portfolio, updatePortfolio } = useContext(PortfolioContext)
  return (
    <React.Fragment>
      <MaterialButton
        onClick={() => closeFunc()}
        disabled={patching}
      >Cancel</MaterialButton>
      <MaterialButton
        onClick={() => {
          if (valid) {
            setPatching(true)
            patchData({
              loginReducer: loginReducer,
              contentType: 'collection',
              id: portfolio.uuid,
              body: body,
              successFunc: (result) => {
                updatePortfolio(result)
                setPatching(false)
                closeFunc()
              },
              errorFunc: (e) => {
                console.error(e)
              },
            })
          }
        }}
        primary
        disabled={!valid || patching || !changed}
      >Save</MaterialButton>
    </React.Fragment>
  )
}

SaveOrCancelButtons.propTypes = {
  loginReducer: PropTypes.object.isRequired,
  closeFunc: PropTypes.func.isRequired,
  patching: PropTypes.bool,
  setPatching: PropTypes.func.isRequired,
  body: PropTypes.object.isRequired,
  valid: PropTypes.bool,
  changed: PropTypes.bool,
}
export const mapStateToProps = (state) => {
  return { ...state }
}

export default connect(
  mapStateToProps,
)(SaveOrCancelButtons)
