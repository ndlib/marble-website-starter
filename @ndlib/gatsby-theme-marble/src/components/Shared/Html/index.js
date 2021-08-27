/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import { jsx, Text, useThemeUI } from 'theme-ui'
import PropTypes from 'prop-types'

const Html = ({ html, variant, sx }) => {
  const themeUi = useThemeUI()
  const htmlSx = {
    '& a': themeUi.theme.links.default,
    '& h2': themeUi.theme.styles.h2,
    '& h3': themeUi.theme.styles.h3,
    '& p': themeUi.theme.text.default,
    '& li': themeUi.theme.styles.li,
    ...sx,
  }

  return (
    <Text sx={htmlSx} variant={variant} as='div' dangerouslySetInnerHTML={{ __html: html }} />
  )
}

Html.propTypes = {
  html: PropTypes.string.isRequired,
  variant: PropTypes.string.isRequired,
  sx: PropTypes.object,
}

Html.defaultProps = {
  variant: 'default',
  sx: {},
}

export default Html
