import React, { useState } from 'react'
import PropTypes from 'prop-types'
import ToggleButton from './ToggleButton'
import style from './style.module.css'

import listIcon from 'assets/icons/svg/baseline-view_list-24px.svg'
import gridIcon from 'assets/icons/svg/baseline-view_module-24px.svg'

export const DisplayViewToggle = ({ defaultActive, children }) => {
  if (defaultActive !== 'list' && defaultActive !== 'grid') {
    defaultActive = 'grid'
  }
  const [activeStyle, setActiveStyle] = useState(defaultActive)
  const options = ['list', 'grid']

  return (
    <div classame={activeStyle}>
      <div className={style.displayViewToggleGroup}>
        {
          options.map(opt => {
            return (
              <ToggleButton
                key={opt}
                icon={opt === 'list' ? listIcon : gridIcon}
                option={opt}
                action={() => {
                  setActiveStyle(opt)
                }}
                active={activeStyle === opt}
              />
            )
          })
        }
      </div>
      <br className='clearfix' />
      {children}
    </div>
  )
}

DisplayViewToggle.propTypes = {
  defaultActive: PropTypes.string,
  children: PropTypes.node.isRequired,
}

DisplayViewToggle.defaultProps = {
  defaultActive: 'grid',
}

export default DisplayViewToggle
