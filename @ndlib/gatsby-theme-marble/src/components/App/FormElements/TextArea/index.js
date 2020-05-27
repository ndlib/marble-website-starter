/** @jsx jsx */
import { jsx } from 'theme-ui'
import PropTypes from 'prop-types'
import sx from './sx'

const TextArea = ({ id, label, defaultValue = '', onChange, disabled = false }) => {
  return (
    <div sx={sx.wrapper}>
      <label
        htmlFor={id}
        sx={sx.label}
      >{label}</label>
      <textarea
        id={id}
        sx={sx.textArea}
        defaultValue={defaultValue}
        disabled={disabled}
        onChange={onChange}
      />
    </div>
  )
}

TextArea.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  defaultValue: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
}

TextArea.defaultProps = {
  onChange: (event) => {
    console.warn(`TextArea changed to "${event.target.value}" but no function was specified in props.`)
  },
}
export default TextArea
