import React, { useState } from 'react'
import PropTypes from 'prop-types'
import ToggleButton from './ToggleButton'
import style from './style.module.css'

import listIcon from 'assets/icons/svg/baseline-view_list-24px.svg'
import gridIcon from 'assets/icons/svg/baseline-view_module-24px.svg'

export const DisplayViewToggle = ({ defaultActive, children }) => {
  const [activeStyle, setActiveStyle] = useState(defaultActive)

  return (
    <div classame={activeStyle}>
      <div className={style.displayViewToggleGroup}>
        <ToggleButton
          icon={listIcon}
          option='list'
          action={() => {
            setActiveStyle('list')
          }}
          active={activeStyle === 'list'}
        />
        <ToggleButton
          icon={gridIcon}
          option='grid'
          action={() => {
            setActiveStyle('grid')
          }}
          active={activeStyle === 'grid'}
        />
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
