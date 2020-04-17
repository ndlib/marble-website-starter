import React from 'react'
import PropTypes from 'prop-types'
import CalloutBox from 'components/Shared/CalloutBox'
import PortfolioDisplay from './PortfolioDisplay'

export const PortfolioView = ({ portfolio }) => {
  const { description, items, layout, userId } = portfolio
  return (
    <React.Fragment>
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
}

export default PortfolioView
