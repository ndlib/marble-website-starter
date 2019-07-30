import React from 'react'
import PropTypes from 'prop-types'
import typy from 'typy'
import Link from 'components/Internal/Link'
import style from './style.module.css'
const BackToItem = ({ location }) => {
  if (typy(location, 'state.referal.type').safeString === 'item') {
    return (
      <Link
        className={style.backLink}
        to={location.state.referal.backLink}
      >≪ Return to Item</Link>
    )
  }
  return null
}

BackToItem.propTypes = {
  location: PropTypes.object,
}
export default BackToItem
