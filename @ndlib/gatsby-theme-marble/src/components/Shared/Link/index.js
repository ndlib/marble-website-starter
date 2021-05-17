/** @jsx jsx */
import React from 'react'
import { jsx, Link as ThemeLink } from 'theme-ui'
import PropTypes from 'prop-types'
import { Link as GatsbyLink } from 'gatsby'

// https://www.gatsbyjs.org/docs/gatsby-link/#reminder-use-link-only-for-internal-links

// Since DOM elements <a> cannot receive activeClassName
// and partiallyActive, destructure the prop here and
// pass it only to GatsbyLink
const Link = ({ variant, children, to, activeClassName, partiallyActive, ...other }) => {
  // Tailor the following test to your environment.
  // This example assumes that any internal link (intended for Gatsby)
  // will start with exactly one slash, and that anything else is external.
  const external = isExternal(to)

  // Use Gatsby Link for internal links, and <a> for others
  if (!external) {
    // Play safe and make sure internal links start with '/'
    if (!to.startsWith('/')) {
      to = `/${to}`
    }
    return (
      <GatsbyLink
        sx={{ variant: 'links.' + variant }}
        to={to}
        activeClassName={activeClassName}
        partiallyActive={partiallyActive}
        {...other}
      >
        {children}
      </GatsbyLink>
    )
  }
  return (
    <ThemeLink variant={variant} href={to} target='_blank' rel='noopener noreferrer' {...other}>
      {children}
    </ThemeLink>
  )
}

Link.propTypes = {
  children: PropTypes.node.isRequired,
  to: PropTypes.string.isRequired,
  activeClassName: PropTypes.string,
  variant: PropTypes.string.isRequired,
  partiallyActive: PropTypes.bool,
}

Link.defaultProps = {
  variant: 'default',
}

export default Link

export const isExternal = (link) => {
  return link.startsWith('http')
}
