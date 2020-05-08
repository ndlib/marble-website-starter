/** @jsx jsx */
import { jsx } from 'theme-ui'
import PropTypes from 'prop-types'

const ImageSettings = ({ sxStyle, size, setSize, format, setFormat }) => {
  return (
    <div sx={sxStyle.controlWrapper}>
      <label htmlFor='size'>Size:</label>
      <select
        name='size'
        onChange={(event) => {
          setSize(event.target.value)
        }}
        onBlur={() => {}}
        value={size}
        sx={sxStyle.select}
      >
        <option value='full'>100%</option>
        <option value='pct:50'>50%</option>
        <option value='pct:25'>25%</option>
      </select>
      <label htmlFor='fromat'>Format:</label>
      <select
        name='format'
        onChange={(event) => {
          setFormat(event.target.value)
        }}
        onBlur={() => {}}
        value={format}
        sx={sxStyle.select}
      >
        <option value='jpg'>.jpg</option>
        <option value='png'>.png</option>
      </select>
    </div>
  )
}

ImageSettings.propTypes = {
  sxStyle: PropTypes.object.isRequired,
  size: PropTypes.string.isRequired,
  setSize: PropTypes.func.isRequired,
  format: PropTypes.string.isRequired,
  setFormat: PropTypes.func.isRequired,
}

export default ImageSettings
