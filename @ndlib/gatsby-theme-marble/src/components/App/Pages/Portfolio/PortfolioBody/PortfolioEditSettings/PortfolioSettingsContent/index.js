import React, { useState, useContext } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import MaterialButton from 'components/Internal/MaterialButton'
import MultiColumn from 'components/Shared/MultiColumn'
import Column from 'components/Shared/Column'
import VisibilitySettings from './VisibilitySettings'
import LayoutSettings from './LayoutSettings'
import DangerDelete from './DangerDelete'
import { patchData } from 'utils/api'
import { PortfolioContext } from '../../'

const PortfolioSettingsContent = ({ callBack, loginReducer }) => {
  const { portfolio, updatePortfolio } = useContext(PortfolioContext)
  const [layout, changeLayout] = useState(portfolio.layout)
  const [privacy, changePrivacy] = useState(portfolio.privacy)
  const [patching, setPatching] = useState(false)

  return (
    <React.Fragment>
      <MaterialButton
        onClick={(e) => {
          e.preventDefault()
          setPatching(true)
          const body = {
            privacy: privacy || 'private',
            layout: layout || 'default',
          }
          patchData({
            loginReducer: loginReducer,
            contentType: 'collection',
            id: portfolio.uuid,
            body: body,
            successFunc: (result) => {
              // navigate(`/myportfolio/${portfolio.uuid}`)
              updatePortfolio(result)
              callBack()
            },
            errorFunc: (e) => {
              console.error(e)
            },
          })
        }}
        disabled={patching}
        primary
      >Save</MaterialButton>
      <MultiColumn columns='2'>
        <Column>
          <label
            htmlFor='layoutDisplay'
          >Layout</label>
          <LayoutSettings
            portfolio={portfolio}
            onChange={changeLayout}
          />
        </Column>
        <Column>
          <label
            htmlFor='visibility'
          >Privacy</label>
          <VisibilitySettings
            portfolio={portfolio}
            onChange={changePrivacy}
          />
        </Column>
      </MultiColumn>
      <DangerDelete portfolio={portfolio} />
    </React.Fragment>
  )
}

PortfolioSettingsContent.propTypes = {
  callBack: PropTypes.func.isRequired,
  loginReducer: PropTypes.object.isRequired,
}
export const mapStateToProps = (state) => {
  return { ...state }
}

export default connect(
  mapStateToProps,
)(PortfolioSettingsContent)
