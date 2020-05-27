/** @jsx jsx */
import { jsx } from 'theme-ui'
import PropTypes from 'prop-types'
import sx from './sx'

const TextField = ({
  id,
  label,
  onChange,
  defaultValue = '',
  disabled = false,
  valid = true,
  warning = 'Field cannot be blank.',
}) => {
  return (
    <div sx={sx.wrapper}>
      <label
        htmlFor={id}
        sx={sx.label}
      >{label}</label>
      <input
        id={id}
        type='text'
        sx={valid ? sx.input : sx.inputInvalid}
        disabled={disabled}
        defaultValue={defaultValue}
        onChange={onChange}
      />
      {
        valid ? null : <em sx={sx.warning}>{warning}</em>
      }
    </div>
  )
}

TextField.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  defaultValue: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  valid: PropTypes.bool,
  warning: PropTypes.string,
}

TextField.defaultProps = {
  onChange: (event) => {
    console.warn(`TextField changed to "${event.target.value}" but no function was specified in props.`)
  },
}

export default TextField
