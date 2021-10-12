/** @jsx jsx */
import PropTypes from 'prop-types'
import { jsx } from 'theme-ui'
import Link from 'components/Shared/Link'
import sx from './sx'

const BrowseBar = ({
  label,
  target,
  image,
  labelSx,
}) => {
  return (
    <Link to={target} sx={sx.browseSection}>
      <div sx={{ pr: '.75rem' }}>
        {image}
      </div>
      <div sx={{ ...sx.label, ...labelSx }}>
        {label}
      </div>
    </Link>
  )
}

BrowseBar.propTypes = {
  target: PropTypes.string,
  label: PropTypes.string.isRequired,
  image: PropTypes.node,
  labelSx: PropTypes.object,
}

BrowseBar.defaultProps = {
  labelSx: {},
}

export default BrowseBar
