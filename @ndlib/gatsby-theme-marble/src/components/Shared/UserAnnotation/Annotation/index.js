import React from 'react'
import PropTypes from 'prop-types'
import typy from 'typy'
import CalloutBox from 'components/Shared/CalloutBox'
import Attribution from 'components/Shared/Attribution'
import Link from 'components/Shared/Link'
import UserCartouche from 'components/Shared/UserCartouche'
import { usePortfolioContext } from '@ndlib/gatsby-theme-marble/src/context/PortfolioContext'
import { useUserContext } from '@ndlib/gatsby-theme-marble/src/context/UserContext'

export const UserAnnotation = ({ itemId }) => {
  const { portfolio } = usePortfolioContext()
  const { portfolioUser } = useUserContext()
  const item = typy(portfolio, 'portfolioItems.items').safeArray.find(i => itemId === i.portfolioItemId)

  if (portfolio && item && item.annotation) {
    return (
      <CalloutBox>
        <Attribution>
          <UserCartouche user={portfolioUser} /> provided the annotation:</Attribution>
        <p>{item.annotation}</p>
        <Attribution>See <Link to={`/user/${portfolioUser.portfolioUserId}/${portfolio.portfolioCollectionId}`}>portfolio</Link>.</Attribution>
      </CalloutBox>
    )
  }
  return null
}

UserAnnotation.propTypes = {
  itemId: PropTypes.string.isRequired,
}

export default UserAnnotation
