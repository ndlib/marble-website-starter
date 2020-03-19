/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import PropTypes from 'prop-types'
import { useThemeUI, jsx } from 'theme-ui'
import HorizontalRule from 'components/Shared/HorizontalRule'

const BlockQuote = ({ children }) => {
  const context = useThemeUI()
  const { theme } = context

  return (
    <blockquote
      sx={{
        fontFamily: 'heading',
        fontSize: ['24px', '36px', '36px'],
        margin: '0 auto',
        maxWidth: '80%',
        textAlign: 'center',
      }}
    >
      <HorizontalRule color={theme.colors.attention} />
      {children}
      <HorizontalRule color={theme.colors.attention} />
    </blockquote>
  )
}

BlockQuote.propTypes = {
  children: PropTypes.node.isRequired,
}
export default BlockQuote
