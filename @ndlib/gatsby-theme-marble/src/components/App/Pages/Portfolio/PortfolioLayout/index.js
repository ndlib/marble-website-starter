import React from 'react'
import PropTypes from 'prop-types'
import { navigate } from 'gatsby'
import Seo from 'components/Internal/Seo'
import { ownsPage } from 'utils/auth'
import Ownership from './Ownership'

const PortfolioLayout = ({ portfolio, edit, location, loginReducer, children }) => {
  const { user } = portfolio
  const isOwner = ownsPage(loginReducer, user.userName)
  if (!isOwner && edit) {
    navigate(`/myportfolio/${portfolio.id}`)
  }
  return (
    <React.Fragment>
      <Seo
        title={portfolio.title}
        location={location}
        data={{}}
        noIndex // ={portfolio.visibility !== 'public'}
      />
      <Ownership
        portfolio={portfolio}
        loginReducer={loginReducer}
      />
      {children}
    </React.Fragment>
  )
}

PortfolioLayout.propTypes = {
  portfolio: PropTypes.object.isRequired,
  edit: PropTypes.bool,
  location: PropTypes.object.isRequired,
  loginReducer: PropTypes.object.isRequired,
  children: PropTypes.node,
}

export default PortfolioLayout
