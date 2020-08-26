/** @jsx jsx */
import PropTypes from 'prop-types'
import { jsx } from 'theme-ui'
import sx from './sx'

const HeroBox = ({
  children,
  backgroundImage,
  backgroundColor,
}) => {
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
        backgroundColor: backgroundColor || 'primary',
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
  backgroundColor: PropTypes.string,
}

export default HeroBox
