import React from 'react'
import PropTypes from 'prop-types'
import { navigate } from 'gatsby'
import MaterialButton from 'components/Internal/MaterialButton'
import CalloutBox from 'components/Shared/CalloutBox'
import { ownsPage } from 'utils/auth'
import PortfolioDisplay from './PortfolioDisplay'

const PortfolioView = ({ portfolio, loginReducer }) => {
  const { description, items, display, user } = portfolio
  const isOwner = ownsPage(loginReducer, user.userName)
  return (
    <React.Fragment>
      {
        isOwner
          ? <p style={{ textAlign: 'right' }}>
            <MaterialButton onClick={() => navigate(`/myportfolio/${portfolio.id}/edit`)}>Edit</MaterialButton>
          </p> : null
      }
      {
        description ? <div><CalloutBox><p>{description}</p></CalloutBox></div> : null
      }
      <PortfolioDisplay
        display={display}
        items={items}
        user={user}
      />
    </React.Fragment>
  )
}

PortfolioView.propTypes = {
  portfolio: PropTypes.object.isRequired,
  loginReducer: PropTypes.object.isRequired,
}
export default PortfolioView
