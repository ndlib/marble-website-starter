/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import PropTypes from 'prop-types'
import typy from 'typy'
import Link from 'components/Internal/Link'
import { BaseStyles, jsx } from 'theme-ui'
import sx from './sx'
export const BackToItem = ({ slug, title }) => {
  return (
    <BaseStyles>
      <Link
        to={typy(slug).safeString}
        sx={sx}
      >Back to {typy(title).safeString}
      </Link>
    </BaseStyles>
  )
}

BackToItem.propTypes = {
  slug: PropTypes.string,
  title: PropTypes.string,
}
export default BackToItem
