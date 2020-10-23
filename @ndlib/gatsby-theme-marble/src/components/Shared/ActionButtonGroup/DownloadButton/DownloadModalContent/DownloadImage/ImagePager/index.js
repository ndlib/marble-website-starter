/** @jsx jsx */
import { jsx } from 'theme-ui'
import PropTypes from 'prop-types'
import MaterialButton from 'components/Internal/MaterialButton'

const ImagePager = ({ sxStyle, images, selected, setSelected }) => {
  if (images.length < 2) {
    return null
  }
  return (
    <div sx={sxStyle.controlWrapper}>
      <MaterialButton
        onClick={() => {
          setSelected(selected - 1)
        }}
        disabled={selected === 0}
      >&lt;
      </MaterialButton>
      <select
        onChange={(event) => {
          setSelected(parseInt(event.target.value, 10))
        }}
        onBlur={() => {}}
        value={selected}
        sx={sxStyle.select}
      >
        {
          images.map((image, index) => {
            return (
              <option
                value={index}
                key={index}
              >{index + 1}
              </option>
            )
          })
        }
      </select>
      <MaterialButton
        onClick={() => {
          setSelected(selected + 1)
        }}
        disabled={selected === images.length - 1}
      >&gt;
      </MaterialButton>
    </div>
  )
}

ImagePager.propTypes = {
  sxStyle: PropTypes.object.isRequired,
  images: PropTypes.array.isRequired,
  selected: PropTypes.number.isRequired,
  setSelected: PropTypes.func.isRequired,
}

export default ImagePager
