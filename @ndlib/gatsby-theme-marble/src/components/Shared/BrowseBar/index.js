/** @jsx jsx */
import PropTypes from 'prop-types'
import { jsx } from 'theme-ui'
import Link from 'components/Internal/Link'
import sx from './sx'

const BrowseBar = ({
  label,
  target,
  image,
  imageNext,
}) => {
  return (
    <Link to={target} sx={sx.browseSection}>
      <picture sx={sx.browseImage}>
        <source
          srcSet={imageNext}
          type='image/webp'
        />
        <img
          alt='label'
          src={image}
        />
      </picture>
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
  imageNext: PropTypes.string,
}

export default BrowseBar
