/** @jsx jsx */
import PropTypes from 'prop-types'
import Link from 'components/Shared/Link'
import { jsx, BaseStyles } from 'theme-ui'
import typy from 'typy'

const ParentLink = ({ children }) => {
  const parentObject = typy(children, '[0].props.data.marbleItem.marbleParent').safeObject
  if (parentObject && parentObject.title && parentObject.slug) {
    return (
      <BaseStyles>
        <Link
          to={parentObject.slug}
          sx={{
            fontSize: '.8rem',
            textDecoration: 'none',
            '&:hover': {
              textDecoration: 'underline',
            },
          }}
        >Part of <i>{parentObject.title}</i> Collection
        </Link>
      </BaseStyles>
    )
  }
  return null
}

ParentLink.propTypes = {
  children: PropTypes.node,
}

export default ParentLink
