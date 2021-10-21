/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import PropTypes from 'prop-types'
import Link from 'components/Shared/Link'
import { jsx } from 'theme-ui'

/*
  Class to add a ND theme breadcrumbs to a page.
  props:
  variant - default the style variant for changing propeties in the theme-ui. currently theme only supports default
  breadcrumbs   - array of objects in the format of [ {url, title} ... ].
  currentPageTitle   - the page title to put at the end
  Breadcrumbs:
     can have several parameters.
      -url a link for the a tag.
      -title for the link.
     Do not include home or the current page.
     Add currentPageTitle for the page title
  Trimmed titles:
    Titles > 60 chars get trimed on several characters see trimTitle
    If they are still > 60 chars they get truncated
  Theme UI Variant.
    writes a variant called links.${variant}
    Can be edited in the theme.
  Examples of existing variants
    default:
*/
export const NDBrandBreadcrumbs = ({ variant, breadcrumbs, currentPageTitle, ...props }) => {
  const sx = {
    pl: 0,
    py: '1.5rem',
    m: 0,
    listStyle: 'none',
    fontSize: 0,
    '& li': {
      display: ['none', 'none', 'none', 'inline-block'],
      mr: '0.75rem',
      '&:nth-last-of-type(2)': {
        display: 'inline-block',
      },
    },

  }
  return (
    <ol varaint={'breadcrumbs.' + variant} sx={sx} {...props}>
      <li><Link variant='breadcrumb' to='/'>Home</Link> › </li>
      {breadcrumbs.map((item) => {
        return (<li key={item.url}><Link variant='breadcrumb' to={item.url}>{trimTitle(item.title)}</Link>›</li>)
      })}
      <li>{trimTitle(currentPageTitle)} › </li>
    </ol>
  )
}

const trimTitle = (title) => {
  if (title.length > 60) {
    const splitTitle = title.split(/[:_([]/)
    if (splitTitle[0].length > 60) {
      // match the first 60 characters up to a space or end of line
      // note that if the characters do not have a space in it it will choose the last chars up that space.
      return splitTitle[0].match(/.{1,60}(\s|$)/g)[0].trim() + '...'
    }
    return splitTitle[0].trim()
  }
  return title
}

export const getBreadcrumbs = (item, breadcrumbs = []) => {
  if (item.marbleParent) {
    getBreadcrumbs(item.marbleParent, breadcrumbs)
    breadcrumbs.push({
      url: item.marbleParent.slug,
      title: item.marbleParent.title,
    })
  }
  return breadcrumbs
}
NDBrandBreadcrumbs.propTypes = {
  variant: PropTypes.string.isRequired,
  breadcrumbs: PropTypes.array.isRequired,
  currentPageTitle: PropTypes.string.isRequired,
  props: PropTypes.object,
}

NDBrandBreadcrumbs.defaultProps = {
  variant: 'default',
}

export default NDBrandBreadcrumbs
