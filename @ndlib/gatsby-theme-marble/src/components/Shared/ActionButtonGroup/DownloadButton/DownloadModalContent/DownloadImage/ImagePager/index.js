/** @jsx jsx */
import { jsx, Button } from 'theme-ui'
import PropTypes from 'prop-types'

const ImagePager = ({ sxStyle, images, selected, setSelected }) => {
  if (images.length < 2) {
    return null
  }
  return (
    <div sx={sxStyle.controlWrapper}>
      <Button
        onClick={() => {
          setSelected(selected - 1)
        }}
        disabled={selected === 0}
        variant='light'
      >&lt;
      </Button>
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
      <Button
        onClick={() => {
          setSelected(selected + 1)
        }}
        disabled={selected === images.length - 1}
        variant='light'
      >&gt;
      </Button>
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
