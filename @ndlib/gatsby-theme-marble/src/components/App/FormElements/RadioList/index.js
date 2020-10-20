import React from 'react'
import PropTypes from 'prop-types'
import checked from 'assets/icons/svg/baseline-radio_button_checked-24px.svg'
import unchecked from 'assets/icons/svg/baseline-radio_button_unchecked-24px.svg'
import style from './style.module.css'

const RadioList = ({ options, fieldName, onChange }) => {
  if (!options || options.length < 1) {
    return null
  }

  return (
    <div
      id={fieldName}
      className={style.options}
    >
      {
        options.map(option => {
          return (
            <React.Fragment key={option}>
              <input
                type='radio'
                name={fieldName}
                value={option.value}
                className={style.option}
                defaultChecked={option.checked}
                onChange={(event) => {
                  onChange(event.target.value)
                }}
                aria-label={option.value}
              />
              <div>
                <div className={style.radioButton}>
                  <img
                    src={checked}
                    alt='selected'
                    className={style.checkedImg}
                  />
                  <img
                    src={unchecked}
                    alt='not selected'
                    className={style.uncheckedImg}
                  />
                </div>
                <div className={style.radioLabel}>
                  {option.formattedLabel}
                </div>
              </div>
            </React.Fragment>
          )
        })
      }
    </div>
  )
}

RadioList.propTypes = {
  options: PropTypes.array,
  fieldName: PropTypes.string.isRequired,
  onChange: PropTypes.func,
}

export default RadioList
