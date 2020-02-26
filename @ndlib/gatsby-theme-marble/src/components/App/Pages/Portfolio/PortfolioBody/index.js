import React from 'react'
import PropTypes from 'prop-types'
import PortfolioView from './PortfolioView'
import PortfolioEdit from './PortfolioEdit'

const PortfolioBody = ({ portfolio, edit }) => {
  return edit ? <PortfolioEdit portfolio={portfolio} /> : <PortfolioView portfolio={portfolio} />
}

PortfolioBody.propTypes = {
  portfolio: PropTypes.object.isRequired,
  edit: PropTypes.bool,
}

export default PortfolioBody
