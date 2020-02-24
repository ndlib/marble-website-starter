import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { navigate } from 'gatsby'
import MaterialButton from 'components/Internal/MaterialButton'
import CalloutBox from 'components/Shared/CalloutBox'
import { ownsPage } from 'utils/auth'
import PortfolioDisplay from './PortfolioDisplay'

export const PortfolioView = ({ portfolio, loginReducer }) => {
  const { description, items, layout, userId } = portfolio
  const isOwner = ownsPage(loginReducer, portfolio.userId)
  return (
    <React.Fragment>
      {
        isOwner
          ? <p style={{ textAlign: 'right' }}>
            <MaterialButton onClick={() => navigate(`/myportfolio/${portfolio.uuid}/edit`)}>Edit</MaterialButton>
          </p> : null
      }
      {
        description ? <div><CalloutBox><p>{description}</p></CalloutBox></div> : null
      }
      <PortfolioDisplay
        layout={layout}
        items={items}
        userId={userId}
      />
    </React.Fragment>
  )
}

PortfolioView.propTypes = {
  portfolio: PropTypes.object.isRequired,
  loginReducer: PropTypes.object.isRequired,
}

export const mapStateToProps = (state) => {
  return { ...state }
}

export default connect(
  mapStateToProps,
)(PortfolioView)
