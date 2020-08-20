import React, { useState } from 'react'
import PropTypes from 'prop-types'
import style from 'components/App/FormElements/style.module.css'
import localStyle from './style.module.css'

const ImageSelect = ({ items, currentImage, fieldName, onChange }) => {
  const [selectedImage, selectImage] = useState(currentImage)
  return (
    <div
      id={fieldName}
      className={style.editGroup}
    >
      <div className={localStyle.selectedImage}>
        <img
          src={selectedImage}
          alt=''
        />
      </div>
      <div className={localStyle.imageOptions}>
        {
          items.map(item => {
            if (item.image) {
              return (
                <>
                  <label
                    key={item.uuid}
                    className={localStyle.imageOption}
                    htmlFor={item.uuid}
                  >
                    Image Select
                  </label>
                  <input
                    type='radio'
                    name={fieldName}
                    value={item.image}
                    defaultChecked={selectedImage === item.image}
                    onChange={
                      (event) => {
                        selectImage(event.target.value)
                        onChange(event.target.value)
                      }
                    }
                  />
                  <img
                    src={item.image}
                    alt=''
                  />
                </>
              )
            }
            return null
          })
        }
      </div>
    </div>

  )
}

ImageSelect.propTypes = {
  items: PropTypes.array.isRequired,
  currentImage: PropTypes.string.isRequired,
  fieldName: PropTypes.string.isRequired,
  onChange: PropTypes.func,
}

export default ImageSelect
