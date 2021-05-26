/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import PropTypes from 'prop-types'
import typy from 'typy'
import Link from '@ndlib/gatsby-theme-marble/src/components/Shared/Link'
import { useThemeUI, jsx } from 'theme-ui'
import { useTranslation } from 'react-i18next'

const sx = {
  pl: 0,
  pt: '1.5rem',
  pb: '2rem',
  m: 0,
  listStyle: 'none',
  fontSize: 1,
  svg: {
    mr: '.75rem',
  },
}

export const ReturnToSearch = ({ location }) => {
  const { t } = useTranslation()
  const context = useThemeUI()
  const iconColor = typy(context, 'theme.colors.primary').safeString
  if (typy(location, 'state.referal.type').safeString === 'search') {
    const linkText = t('common:item.returnToSearch')
    const target = `/search${location.state.referal.query}`
    return (
      <div sx={sx}>
        <Link
          to={target}
          variant='breadcrumb'
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
          {linkText}
        </Link>
      </div>
    )
  }
  return null
}
ReturnToSearch.propTypes = {
  location: PropTypes.object,
}
export default ReturnToSearch
