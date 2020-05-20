import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import typy from 'typy'
import PortfolioBody from './PortfolioBody'
import PortfolioUnavailable from './PortfolioUnavailable'
import Loading from 'components/Internal/Loading'
import { getData } from 'utils/api'
import { ownsPage } from 'utils/auth'

export const Portfolio = ({ portfolioId, location, loginReducer }) => {
  const [content, setContent] = useState(<Loading />)

  useEffect(() => {
    const abortController = new AbortController()
    if (loginReducer.status === 'STATUS_NOT_LOGGED_IN' || loginReducer.status === 'STATUS_LOGGED_IN') {
      getData({
        loginReducer: loginReducer,
        contentType: 'collection',
        id: portfolioId,
        successFunc: (data) => {
          const { privacy, userId } = data
          const isOwner = ownsPage(loginReducer, userId)
          if (privacy === 'private' && !isOwner) {
            setContent(<PortfolioUnavailable />)
          } else {
            setContent(<PortfolioBody
              location={location}
              portfolio={data}
              isOwner={isOwner}
            />)
          }
        },
        errorFunc: () => {
          setContent(<PortfolioUnavailable />)
        },
      })
    }
    return () => {
      abortController.abort()
    }
  }, [portfolioId, loginReducer, location])

  return (
    <React.Fragment>
      {content}
    </React.Fragment>
  )
}

Portfolio.propTypes = {
  portfolioId: PropTypes.string,
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
