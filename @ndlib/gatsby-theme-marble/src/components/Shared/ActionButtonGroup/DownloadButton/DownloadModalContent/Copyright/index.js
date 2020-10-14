/** @jsx jsx */
import PropTypes from 'prop-types'
import { BaseStyles, jsx } from 'theme-ui'
import sx from './sx'

export const Copyright = ({ text }) => {
  return (
    <BaseStyles>
      <div sx={sx.wrapper}>{text}</div>
    </BaseStyles>
  )
}

Copyright.propTypes = {
  text: PropTypes.string,
}

Copyright.defaultProps = {
  text: `© ${new Date().getFullYear()}`,
}

export default Copyright
