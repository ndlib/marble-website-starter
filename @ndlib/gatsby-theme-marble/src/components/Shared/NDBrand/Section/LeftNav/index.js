/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import PropTypes from 'prop-types'
import { jsx, Grid } from 'theme-ui'

export const NDBrandSectionLeftNav = ({ location, variant, children, ...props }) => {
  return (
    <Grid variant={`sections.${variant}`} as='section' sx={{ ml: '5vw', mr: '5vw' }} columns={['100% 0%', '22vw 68vw', '22vw 68vw']} {...props} >
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
  variant: 'default',
}

export default NDBrandSectionLeftNav
