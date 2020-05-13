/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import VisibilityLabel from 'components/Internal/VisibilityLabel'
import Attribution from 'components/Internal/Attribution'
import UserCartouche from 'components/Internal/UserCartouche'
import PortfolioEditSettings from '../PortfolioEditSettings'
import ShareButton from 'components/Internal/ShareButton'
import PrintButton from 'components/Internal/PrintButton'
import { jsx } from 'theme-ui'
import { PortfolioContext } from '../'
import sx from './sx'

export const Ownership = ({ isOwner }) => {
  const { portfolio } = useContext(PortfolioContext)
  const { privacy, userId, uuid } = portfolio
  if (isOwner) {
    return (
      <div sx={sx.wrapper}>
        <div sx={sx.visibilityWrapper}>
          This is your <VisibilityLabel visibility={privacy} /> portfolio.
        </div>
        <div sx={sx.shareWrapper}>
          <ShareButton path={`myportfolio/${uuid}`} />
          <PrintButton />
        </div>
        <div sx={sx.editWrapper}>
          <PortfolioEditSettings portfolio={portfolio} />
        </div>
      </div>
    )
  }
  return (
    <div sx={sx.wrapper}>
      <Attribution>
        Portfolio collected and annotated by <UserCartouche user={{ uuid: userId }} />
      </Attribution>
      <div sx={sx.shareWrapper}>
        <ShareButton path={`myportfolio/${uuid}`} />
        <PrintButton />
      </div>
    </div>
  )
}

Ownership.propTypes = {
  isOwner: PropTypes.bool,
}

export default Ownership
