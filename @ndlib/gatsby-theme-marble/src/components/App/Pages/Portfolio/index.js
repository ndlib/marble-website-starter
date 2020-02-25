import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import typy from 'typy'
import PortfolioLayout from './PortfolioLayout'
import PortfolioBody from './PortfolioBody'
import PortfolioUnavailable from './PortfolioUnavailable'
import Loading from 'components/Internal/Loading'

export const Portfolio = ({ portfolioId, edit, location, loginReducer }) => {
  const [portfolio, setPortfolio] = useState({})
  const [content, setContent] = useState(<Loading />)

  useEffect(() => {
    const abortController = new AbortController()
    const fetchData = async () => {
      if (loginReducer.userContentPath) {
        fetch(`${loginReducer.userContentPath}collection/${portfolioId}`)
          .then(result => {
            return result.json()
          })
          .then(portfolioData => {
            setPortfolio(portfolioData)
            setContent(<PortfolioBody
              portfolio={portfolioData}
              edit={edit}
            />)
          })
          .catch(() => {
            setContent(<PortfolioUnavailable />)
          })
      }
    }

    fetchData()
    return () => {
      abortController.abort()
    }
  }, [loginReducer.userContentPath, portfolioId, edit])

  return (
    <PortfolioLayout
      portfolio={portfolio}
      edit={edit}
      location={location}
    >
      {content}
    </PortfolioLayout>
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
