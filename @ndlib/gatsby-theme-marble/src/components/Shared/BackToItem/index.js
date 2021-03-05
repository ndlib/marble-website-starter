/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import PropTypes from 'prop-types'
import typy from 'typy'
import Link from 'components/Shared/Link'
import { BaseStyles, useThemeUI, jsx } from 'theme-ui'
import sx from './sx'
export const BackToItem = ({ slug, title }) => {
  const context = useThemeUI()
  const iconColor = typy(context, 'theme.colors.primary').safeString
  return (
    <BaseStyles>
      <Link
        to={slug}
        sx={sx}
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
        </svg> Back to {title}
      </Link>
    </BaseStyles>
  )
}

BackToItem.propTypes = {
  slug: PropTypes.string,
  title: PropTypes.string,
}
export default BackToItem
