/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect, useRef } from 'react'
import { jsx, Container, Button } from 'theme-ui'
import PropTypes from 'prop-types'
import { graphql, useStaticQuery } from 'gatsby'
import NDBrandHeader from '@ndlib/gatsby-theme-marble/src/components/Shared/NDBrand/Header'
import Link from '@ndlib/gatsby-theme-marble/src/components/Shared/Link'
import { FaHome, FaSearch, FaGripLines, FaTimes } from 'react-icons/fa'
import typy from 'typy'
import * as ariaAppHider from 'react-modal/lib/helpers/ariaAppHider'

const gutterWidth = '5vw'
export const query = graphql`
query {
  site {
    siteMetadata {
      title
      subTitle
      description
      author
    }
  }
    menusJson(id: {eq: "header"}) {
      id
      label
      items {
        id
        label
        link
        icon
        selectedPatterns
      }
    }
  }
`

const NDBrandLayout = ({ location, variant, children, pageHeader, siteFooter, titleOverride }) => {
  const { menusJson } = useStaticQuery(query)

  const menu = typy(menusJson, 'items').safeArray
  const [showMenu, setShowMenu] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const menuStartRef = useRef()
  const menuEndRef = useRef()
  const menuId = 'mainMenu'

  useEffect(() => {
    const el = document.querySelectorAll('#nav-background')
    console.log(el)
    if (!el) {
      return
    }
    if (showMenu) {
      ariaAppHider.hide(el)
      setTimeout(() => {
        menuStartRef.current.focus()
      }, 500)
    } else {
      ariaAppHider.show(el)
    }
  }, [menuStartRef, showMenu])

  const navDrawerItems = menu.map((l, i) => {
    return (
      <Link
        to={l.link}
        key={l.id}
        title={l.label}
        variant={'navDrawer'}
        className={''}
        ref={i + 1 == menu.length ? menuEndRef : null}
      > {l.label}
      </Link>)
  })
  navDrawerItems.unshift(<Link
    to={'/'}
    key={'/'}
    title={'Home'}
    variant={'navDrawer'}
    className={''}
    innerRef={menuStartRef}
  >Home
  </Link>)

  const items = []
  items.push(
    <Link
      to={'/'}
      key={'/'}
      title={'Home'}
      variant={'navTop'}
      className={''}
    > <FaHome />
      <span>Home</span>
    </Link>)
  items.push(menu.map(l => {
    return (
      <Link
        to={l.link}
        key={l.id}
        title={l.label}
        variant={'navTop'}
        className={'menuLinks'}
      > {l.label}
      </Link>)
  }))

  items.push((
    <Button variant='links.navTop' sx={{
      borderRadius: '0',
      borderLeftWidth: [0, 0, 0, '1px'],
      borderLeftStyle: 'solid',
      borderLeftColor: 'gray.4',
    }} key='toggle-search' onClick={() => setShowSearch(!showSearch)} title='show search'>
      <FaSearch />
      <span>Search</span>
    </Button>)
  )
  items.push((
    <Button variant='links.navTop' sx={{
      borderRadius: '0',
      borderLeftWidth: [0, 0, 0, '1px'],
      borderLeftStyle: 'solid',
      borderLeftColor: 'gray.4',
    }}
      className='menu'
      onClick={() => setShowMenu(!showMenu)}
      title='Toggle Menu'
      ariacontrols={menuId}
      key='toggle-menu'
    >
      { showMenu ? <FaTimes /> : (<><FaGripLines /><span>Menu</span></>) }
    </Button>)
  )

  return (
    <Container sx={{
      variant: variant,
      display: 'grid',
      minHeight: '100%',
      width: '100%',
      position: 'relative',
      gridTemplateRows: '[header-start] auto [header-end main-start] minmax(auto, 1fr) [main-end footer-start] auto [footer-end]',
      right: showMenu ? '14rem' : 'auto',
      boxSizing: 'border-box',
      transition: '.25s ease-in-out',
    }}>
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
      <nav aria-label='Main Menu' aria-modal='true' aria-hidden='false' aria-expanded={showMenu.toString()} id={menuId} sx={{
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
      </nav>
      <div id='nav-background'>
        <NDBrandHeader
          location={location}
          titleOverride={titleOverride}
          menuItems={items}
          setShowSearch={setShowSearch}
          showSearch={showSearch}
        />
        <div id='content' sx={{
          gridTemplateColumns: `[screen-start] ${gutterWidth} [container-start sidebar-start] 22vw [sidebar-end content-start] minmax(0, 1fr) [content-end container-end] ${gutterWidth} [screen-end]`,
          gridTemplateRows: '[header-start] auto [header-end content-start] 1fr [content-end]',
        }}>
          <div id='page-header'>
            {pageHeader}
          </div>
          <main sx={{
            gridColumn: 'container',
            gridRow: 'content',
            position: 'relative',
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: '0',
              bottom: '0',
              left: '70vw',
              width: '30vw',
              zIndex: '-1',
              background: '#fff',
            },
          }}>
            {children}
          </main>
          {siteFooter}
        </div>
      </div>
    </Container>
  )
}

NDBrandLayout.propTypes = {
  location: PropTypes.object,
  variant: PropTypes.string,
  pageHeader: PropTypes.object,
  siteFooter: PropTypes.object,
  titleOverride: PropTypes.node,
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
  ]).isRequired,
}

NDBrandLayout.defaultProps = {
  variant: 'NDBrandLayout',
}
export default NDBrandLayout
