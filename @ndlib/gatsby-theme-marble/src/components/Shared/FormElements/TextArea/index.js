/** @jsx jsx */
import { jsx } from 'theme-ui'
import PropTypes from 'prop-types'
import sx from './sx'

const TextArea = ({ id, label, hideLabel, defaultValue, onChange, disabled, valid, warning }) => {
  return (
    <div sx={sx.wrapper}>
      <label
        htmlFor={id}
        sx={sx.label}
        className={hideLabel ? 'accessibilityOnly' : ''}
      >{label}</label>
      <textarea
        id={id}
        sx={valid ? sx.textarea : sx.textInvalid}
        defaultValue={defaultValue}
        disabled={disabled}
        onChange={onChange}
        aria-label={label}
      />
      {
        valid ? null : <em sx={sx.warning}>{warning}</em>
      }
    </div>
  )
}

TextArea.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  hideLabel: PropTypes.bool,
  defaultValue: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  valid: PropTypes.bool,
  warning: PropTypes.string,
}

TextArea.defaultProps = {
  hideLabel: false,
  defaultValue: '',
  disabled: false,
  valid: true,
  onChange: (event) => {
    console.warn(`TextArea changed to "${event.target.value}" but no function was specified in props.`)
  },
}
export default TextArea
