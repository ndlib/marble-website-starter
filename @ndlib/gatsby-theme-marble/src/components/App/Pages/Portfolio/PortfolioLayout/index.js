import React from 'react'
import PropTypes from 'prop-types'
import Seo from 'components/Internal/Seo'
import Ownership from './Ownership'

const PortfolioLayout = ({ portfolio, location, children }) => {
  return (
    <React.Fragment>
      <Seo
        title={portfolio.title}
        location={location}
        data={{}}
        noIndex // = {portfolio.privacy !== 'public'}
      />
      <h1>{portfolio.title}</h1>
      <Ownership portfolio={portfolio} />
      {children}
    </React.Fragment>
  )
}

PortfolioLayout.propTypes = {
  portfolio: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  children: PropTypes.node,
}

export default PortfolioLayout
