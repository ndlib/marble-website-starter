/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React, { useEffect } from 'react'
import { jsx, Button } from 'theme-ui'
import PropTypes from 'prop-types'
import { FaTimes } from 'react-icons/fa'
import sx from './sx'

const NDBrandDrawer = ({ setShowMenu, showMenu, navDrawerItems, menuId }) => {
  const keyUpHandler = (event) => {
    if (event.code === 'Escape') {
      setShowMenu(false)
    }
  }

  useEffect(() => {
    document.addEventListener('keyup', keyUpHandler)
    return () => {
      document.removeEventListener('keyup', keyUpHandler)
    }
  })

  if (!showMenu) {
    return null
  }

  return (
    <>
      <div className='overlay'
        sx={sx.overlay}
        role='button'
        title='close navigation'
        onClick={() => setShowMenu(false)}
      />
      <nav
        aria-label='Main Menu'
        id={menuId}
        sx={sx.navigation}
      >
        {navDrawerItems}
        <div sx={sx.closeBox}>
          <Button
            name='Filter'
            sx={{
              p: '0.5rem',
              lineHeight: 0,
            }}
            title='Close Menu'
            onClick={() => setShowMenu(false)}
          ><FaTimes /></Button>
        </div>
      </nav>
    </>
  )
}

NDBrandDrawer.propTypes = {
  setShowMenu: PropTypes.func.isRequired,
  showMenu: PropTypes.bool.isRequired,
  menuId: PropTypes.string.isRequired,
  navDrawerItems: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
  ]).isRequired,
}

export default NDBrandDrawer
