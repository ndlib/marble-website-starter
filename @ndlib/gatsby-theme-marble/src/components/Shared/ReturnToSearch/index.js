/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import PropTypes from 'prop-types'
import typy from 'typy'
import Link from 'components/Shared/Link'
import { BaseStyles, useThemeUI, jsx } from 'theme-ui'
import sx from './sx'
import { useTranslation } from 'react-i18next'
export const ReturnToSearch = ({ location }) => {
  const { t } = useTranslation()
  const context = useThemeUI()
  const iconColor = typy(context, 'theme.colors.primary').safeString
  if (typy(location, 'state.referal.type').safeString === 'search') {
    const linkText = t('common:item.returnToSearch')
    const target = `/search${location.state.referal.query}`
    return (
      <BaseStyles>
        <Link
          to={target}
          sx={sx.link}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            height='16'
            viewBox='0 -4 24 24'
            width='16'
            sx={sx.svg}
          >
            <path d='M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z' fill={iconColor} />
            <path d='M0 0h24v24H0z' fill='none' />
          </svg>
          <span sx={sx.text}>{linkText}</span>
        </Link>
      </BaseStyles>
    )
  }
  return null
}
ReturnToSearch.propTypes = {
  location: PropTypes.object,
}
export default ReturnToSearch