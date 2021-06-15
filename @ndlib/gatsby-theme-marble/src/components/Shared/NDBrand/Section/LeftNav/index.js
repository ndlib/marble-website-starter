/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import PropTypes from 'prop-types'
import { jsx, Grid } from 'theme-ui'

export const NDBrandSectionLeftNav = ({ location, variant, children, ...props }) => {
  return (
    <Grid
      variant={`sections.${variant}`}
      as='section'
      gap={'0'}
      columns={['0 100vw', '0 100vw', '0 100vw', '22vw 77vw']}
      {...props}
    >
      {children}
    </Grid>
  )
}

NDBrandSectionLeftNav.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.string.isRequired,
  location: PropTypes.object.isRequired,
}

NDBrandSectionLeftNav.defaultProps = {
  variant: 'navLeft',
}

export default NDBrandSectionLeftNav
