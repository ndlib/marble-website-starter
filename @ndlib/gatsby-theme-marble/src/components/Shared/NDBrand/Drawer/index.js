/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import { jsx, Button } from 'theme-ui'
import PropTypes from 'prop-types'
import { FaTimes } from 'react-icons/fa'

const NDBrandDrawer = ({ setShowMenu, showMenu, navDrawerItems, menuId }) => {
  return (
    <>
      <div className='overlay'
        sx={{
          visibility: showMenu ? 'visible' : 'hidden',
          position: 'fixed',
          right: '14rem',
          top: 0,
          height: '100%',
          width: '100%',
          zIndex: 10,
        }}
        role='button'
        title='close navigation'
        onClick={() => setShowMenu(!showMenu)}
      />
      <nav
        aria-label='Main Menu'
        aria-hidden={showMenu ? 'false' : 'true'}
        aria-expanded={showMenu.toString()}
        id={menuId}
        sx={{
          m: 0,
          p: '20px',
          visibility: showMenu ? 'visible' : 'hidden',
          position: 'fixed',
          top: '0',
          right: '0px',
          height: '100%',
          width: showMenu ? '14rem' : '0',
          background: 'white',
          overflowX: 'hidden',
          overflowY: 'scroll',
          bg: 'gray.2',
          borderLeft: '1px solid gray.4',
          boxShadow: '0 0 8px 0 rgb(0 0 0 / 25%)',
          overflowScrolling: 'touch',
          zIndex: 10,
        }}
        onKeyUp={(e => {
          if (e.keyCode === 27) {
            setShowMenu(!showMenu)
          }
        })}
      >
        {navDrawerItems}
        <div sx={{
          position: 'absolute',
          zIndex: 10,
          bottom: 0,
          left: 0,
          width: '14rem',
          display: 'flex',
          justifyContent: 'center',
          borderTopColor: 'gray.4',
          borderTopStyle: 'solid',
          borderTopWidth: '1px',
          py: '1rem',
        }}>
          <Button
            name='Filter'
            sx={{
              p: '0.5rem',
              lineHeight: 0,
            }}
            title='Close Menu'
            onClick={() => setShowMenu(!showMenu)}
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
