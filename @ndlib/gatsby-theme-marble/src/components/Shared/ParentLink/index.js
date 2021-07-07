/** @jsx jsx */
import PropTypes from 'prop-types'
import Link from '@ndlib/gatsby-theme-marble/src/components/Shared/Link'
import { jsx } from 'theme-ui'
import typy from 'typy'

const ParentLink = ({ marbleItem }) => {
  console.log('MI', marbleItem)
  const parentObject = typy(marbleItem, 'marbleParent').safeObject
  if (parentObject && parentObject.title && parentObject.slug) {
    return (
      <Link
        to={parentObject.slug}
        sx={{
          fontSize: '.8rem',
          textDecoration: 'none',
          '&:hover': {
            textDecoration: 'underline',
          },
        }}
      >Part of <em>{parentObject.title}</em> Collection
      </Link>
    )
  }
  return null
}

ParentLink.propTypes = {
  marbleItem: PropTypes.node,
}

export default ParentLink
