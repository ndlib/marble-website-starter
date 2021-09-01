/** @jsx jsx */
import { jsx } from 'theme-ui'
import PropTypes from 'prop-types'
import Link from 'components/Shared/Link'
import sx from '../../sx.js'

const LinkOrWrapper = ({ target, children }) => {
  return target
    ? (
      <Link
        to={target}
        sx={sx.linkOrWrapper.link}
      >{children}</Link>
    )
    : (
      <div sx={sx.linkOrWrapper.wrapper}>{children}</div>
    )
}

LinkOrWrapper.propTypes = {
  target: PropTypes.string,
  children: PropTypes.node,
}

export default LinkOrWrapper
