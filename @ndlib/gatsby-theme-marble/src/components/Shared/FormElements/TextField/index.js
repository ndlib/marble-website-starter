/** @jsx jsx */
import { jsx } from 'theme-ui'
import PropTypes from 'prop-types'
import sx from './sx'

const TextField = ({
  id,
  label,
  hideLabel,
  onChange,
  defaultValue,
  disabled,
  valid,
  warning,
  autoFocus,
  wrapperSx,
  inputSx,
}) => {
  return (
    <div sx={{
      ...sx.wrapper,
      ...wrapperSx,
    }}>
      <label
        htmlFor={id}
        sx={sx.label}
        className={hideLabel ? 'accessibilityOnly' : ''}
      >{label}</label>
      <input
        id={id}
        type='text'
        sx={{
          ...(valid ? sx.input : sx.inputInvalid),
          ...inputSx,
        }}
        disabled={disabled}
        defaultValue={defaultValue}
        onChange={onChange}
        aria-label={label}
        autoFocus={autoFocus}
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
  hideLabel: PropTypes.bool,
  defaultValue: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  valid: PropTypes.bool,
  warning: PropTypes.string,
  autoFocus: PropTypes.bool,
  wrapperSx: PropTypes.object,
  inputSx: PropTypes.object,
}

TextField.defaultProps = {
  hideLabel: false,
  defaultValue: '',
  disabled: false,
  valid: true,
  autoFocus: false,
  warning: 'Field cannot be blank.',
  onChange: (event) => {
    console.warn(`TextField changed to "${event.target.value}" but no function was specified in props.`)
  },
  // Need an empty object so we can spread properties without null reference
  wrapperSx: {},
  inputSx: {},
}

export default TextField
