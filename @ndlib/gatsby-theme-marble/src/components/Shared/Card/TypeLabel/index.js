/** @jsx jsx */
import PropTypes from 'prop-types'
import icon from 'assets/icons/svg/baseline-collections-modified-24px.svg'
import { jsx } from 'theme-ui'
import sx from './sx'

const TypeLabel = ({ type }) => {
  if (type && type.toLowerCase() === 'collection') {
    return (
      <div sx={sx.wrapper}>
        <img
          src={icon}
          alt=''
          sx={sx.image}
        />
      </div>
    )
  }
  return null
}

TypeLabel.propTypes = {
  type: PropTypes.string,
}

export default TypeLabel
