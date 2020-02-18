import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import typy from 'typy'
import { ownsPage } from 'utils/auth'
import PortfolioLayout from './PortfolioLayout'
import PortfolioView from './PortfolioView'
import PortfolioEdit from './PortfolioEdit'
import PortfolioUnavailable from './PortfolioUnavailable'

export const Portfolio = ({ portfolioId, edit, location, loginReducer }) => {
  // TODO get portfolio from portfolioId
  console.log(portfolioId)
  const portfolio = {}
  const userName = typy(portfolio, 'user.userName').safeString
  const showPortfolio = shouldShow(portfolio, ownsPage(loginReducer, userName))
  if (showPortfolio) {
    return (
      <PortfolioLayout
        portfolio={portfolio}
        edit={edit}
        location={location}
        loginReducer={loginReducer}
      >
        {
          edit
            ? <PortfolioEdit
              portfolio={portfolio}
              location={location}
              loginReducer={loginReducer}
            />
            : <PortfolioView
              portfolio={portfolio}
              location={location}
              loginReducer={loginReducer}
            />
        }
      </PortfolioLayout>
    )
  }
  return (
    <PortfolioUnavailable
      location={location}
      loginReducer={loginReducer}
    />
  )
}

Portfolio.propTypes = {
  portfolioId: PropTypes.string,
  edit: PropTypes.bool,
  location: PropTypes.object.isRequired,
  loginReducer: PropTypes.object.isRequired,
}

export const mapStateToProps = (state) => {
  return { ...state }
}

export default connect(
  mapStateToProps,
)(Portfolio)

export const shouldShow = (portfolio, isOwner) => {
  const visibility = typy(portfolio, 'visibility').safeString
  return visibility === 'public' || visibility === 'shared' || isOwner
}
