/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import PropTypes from 'prop-types'
import Link from 'components/Shared/Link'
import { jsx } from 'theme-ui'

export const NDBrandBreadcrumbs = ({ location, variant, breadcrumbs, currentPageTitle, ...props }) => {
  const sx = {
    pl: 0,
    py: '1.5rem',
    m: 0,
    listStyle: 'none',
    fontSize: 0,
    '& li': {
      display: 'inline-block',
      mr: '0.75rem',
    },
  }
  return (
    <ol varaint={'breadcrumbs.' + variant} sx={sx} {...props}>
      <li><Link variant='breadcrumb' to='/'>Home</Link> › </li>
      {breadcrumbs.map((item) => {
        return (<li key={item.url}><Link variant='breadcrumb' to={item.url}>{item.title}</Link>›</li>)
      })}
      <li>{currentPageTitle} › </li>
    </ol>
  )
}

NDBrandBreadcrumbs.propTypes = {
  variant: PropTypes.string.isRequired,
  location: PropTypes.object.isRequired,
  breadcrumbs: PropTypes.array.isRequired,
  currentPageTitle: PropTypes.string.isRequired,
  props: PropTypes.object,
}

NDBrandBreadcrumbs.defaultProps = {
  variant: 'default',
}

export default NDBrandBreadcrumbs
