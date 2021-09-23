import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import queryString from 'query-string'
import PortfolioUserLayer from '../../App/Layers/PortfolioUserLayer'
import PortfolioLayer from '../../App/Layers/PortfolioLayer'
import Annotation from './Annotation'

export const UserAnnotation = ({ location, loginReducer, itemId }) => {
  const qs = queryString.parse(location.search) || {}
  const userName = Object.keys(qs)[0]
  const portfolioId = qs[userName]

  if (userName) {
    return (
      <PortfolioUserLayer userName={userName} location={location} loginReducer={loginReducer}>
        <PortfolioLayer portfolioId={portfolioId} location={location} loginReducer={loginReducer}>
          <Annotation location={location} itemId={itemId} />
        </PortfolioLayer>
      </PortfolioUserLayer>
    )
  }
  return null
}

UserAnnotation.propTypes = {
  location: PropTypes.object.isRequired,
  loginReducer: PropTypes.object.isRequired,
  itemId: PropTypes.string.isRequired,
}
export const mapStateToProps = (state) => {
  return { ...state }
}

export default connect(
  mapStateToProps,
)(UserAnnotation)
