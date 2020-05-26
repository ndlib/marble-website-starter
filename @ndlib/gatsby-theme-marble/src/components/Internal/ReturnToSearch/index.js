import React from 'react'
import PropTypes from 'prop-types'
import typy from 'typy'
import Link from 'components/Internal/Link'
import style from './style.module.css'
import { BaseStyles } from 'theme-ui'
import backToSearch from 'assets/icons/svg/baseline-arrow_back-24px.svg'

export const ReturnToSearch = ({ location }) => {
  if (typy(location, 'state.referal.type').safeString === 'search') {
    return (
      <nav className={style.returnToSearch}>
        <BaseStyles>
          <Link
            to={`/search${location.state.referal.query}`}
          ><img src={backToSearch} alt='≪ Return to Search' title='Return to Search' />
          </Link>
        </BaseStyles>
      </nav>
    )
  }
  return null
}

ReturnToSearch.propTypes = {
  location: PropTypes.object,
}

export default ReturnToSearch
