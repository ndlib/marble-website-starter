import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import typy from 'typy'
import PortfolioLayout from './PortfolioLayout'
import PortfolioBody from './PortfolioBody'
import PortfolioUnavailable from './PortfolioUnavailable'
import Loading from 'components/Internal/Loading'
import { getData } from 'utils/api'

export const Portfolio = ({ portfolioId, edit, location, loginReducer }) => {
  const [portfolio, setPortfolio] = useState({})
  const [content, setContent] = useState(<Loading />)

  useEffect(() => {
    const abortController = new AbortController()
    getData({
      loginReducer: loginReducer,
      contentType: 'collection',
      id: portfolioId,
      successFunc: (data) => {
        setPortfolio(data)
        setContent(<PortfolioBody
          portfolio={data}
          edit={edit}
        />)
      },
      errofFunc: () => {
        setContent(<PortfolioUnavailable />)
      },
    })
    return () => {
      abortController.abort()
    }
  }, [portfolioId, edit, loginReducer])

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
