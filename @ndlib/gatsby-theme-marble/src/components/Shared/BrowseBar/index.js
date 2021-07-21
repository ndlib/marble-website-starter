/** @jsx jsx */
import PropTypes from 'prop-types'
import { jsx } from 'theme-ui'
import Link from 'components/Shared/Link'
import sx from './sx'

const BrowseBar = ({
  label,
  target,
  image,
}) => {
  return (
    <Link to={target} sx={sx.browseSection}>
      <div sx={{ pr: '.75rem' }}>
        {image}
      </div>
      <div sx={sx.label}>
        {label}
      </div>
    </Link>
  )
}

BrowseBar.propTypes = {
  target: PropTypes.string,
  label: PropTypes.string.isRequired,
  image: PropTypes.string,
}

export default BrowseBar
