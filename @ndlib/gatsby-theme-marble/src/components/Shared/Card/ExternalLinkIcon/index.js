/** @jsx jsx */
import PropTypes from 'prop-types'
import { jsx } from 'theme-ui'
import { isExternal } from 'components/Shared/Link'
import openInNew from 'assets/icons/svg/baseline-open_in_new-24px-white.svg'
import sx from './sx.js'

const ExternalLinkIcon = ({ target }) => {
  if (target && isExternal(target)) {
    return (
      <span sx={sx.iconWrapper}>
        <img
          src={openInNew}
          alt='Link to external site.'
          title='Link to external site.'
          sx={sx.image}
        />
      </span>
    )
  }
  return null
}

ExternalLinkIcon.propTypes = {
  target: PropTypes.string,
}
export default ExternalLinkIcon
