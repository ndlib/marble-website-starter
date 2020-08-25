/** @jsx jsx */
import PropTypes from 'prop-types'
import { jsx } from 'theme-ui'
import sx from './sx'

const HeroBox = ({ children, backgroundImage }) => {
  let safeImage = null
  if (typeof backgroundImage === 'string') {
    safeImage = `url('${backgroundImage}')`
  } else if (typeof backgroundImage === 'object') {
    safeImage = backgroundImage
  }
  return (
    <div
      sx={{
        ...sx.wrapper,
        backgroundImage: safeImage,
      }}
    >
      {children}
    </div>
  )
}

HeroBox.propTypes = {
  children: PropTypes.node,
  backgroundImage: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
}

export default HeroBox
