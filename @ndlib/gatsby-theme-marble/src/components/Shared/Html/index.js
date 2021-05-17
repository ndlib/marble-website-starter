/** @jsx jsx */
import React from 'react'
import { jsx, BaseStyles, Text } from 'theme-ui'
import PropTypes from 'prop-types'

const Html = ({ html, variant, ...props }) => {
  return (
    <div {...props}>
      <BaseStyles>
        <Text variant={variant} as='p' dangerouslySetInnerHTML={{ __html: html }} />
      </BaseStyles>
    </div>
  )
}

Html.propTypes = {
  html: PropTypes.string.isRequired,
  variant: PropTypes.string.isRequired,
}

Html.defaultProps = {
  variant: 'default',
}

export default Html
