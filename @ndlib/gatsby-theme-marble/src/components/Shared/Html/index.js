/** @jsx jsx */
import React from 'react'
import { jsx, Text, useThemeUI } from 'theme-ui'
import PropTypes from 'prop-types'

const Html = ({ html, variant, sx }) => {
  const themeUi = useThemeUI()
  const htmlSx = {
    ...sx,
    a: themeUi.theme.links.default,
    h2: themeUi.theme.text.heading,
    h3: themeUi.theme.text.heading,
    p: themeUi.theme.text.default,
  }

  return (
    <Text sx={htmlSx} variant={'html.' + variant} as='p' dangerouslySetInnerHTML={{ __html: html }} />
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
