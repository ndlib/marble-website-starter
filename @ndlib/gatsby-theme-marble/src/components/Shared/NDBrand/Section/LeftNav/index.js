/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import PropTypes from 'prop-types'
import { jsx, Grid } from 'theme-ui'

export const NDBrandSectionLeftNav = ({ variant, children, ...props }) => {
  return (
    <Grid
      variant={`sections.${variant}`}
      as='section'
      gap={'0'}
      columns={['0 100%', '0 100%', '0 100%', '23% 77%']}
      {...props}
    >
      {children}
    </Grid>
  )
}

NDBrandSectionLeftNav.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.string.isRequired,
}

NDBrandSectionLeftNav.defaultProps = {
  variant: 'navLeft',
}

export default NDBrandSectionLeftNav
