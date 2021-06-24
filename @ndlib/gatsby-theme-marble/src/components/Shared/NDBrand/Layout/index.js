/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import { jsx, Container, Button } from 'theme-ui'
import PropTypes from 'prop-types'
import { graphql, useStaticQuery } from 'gatsby'
import NDBrandHeader from '@ndlib/gatsby-theme-marble/src/components/Shared/NDBrand/Header'
import Link from '@ndlib/gatsby-theme-marble/src/components/Shared/Link'
import { FaHome, FaSearch, FaGripLines, FaTimes } from 'react-icons/fa'
import typy from 'typy'

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

  const navDrawerItems = menu.map(l => {
    return (
      <Link
        to={l.link}
        key={l.id}
        title={l.label}
        variant={'navDrawer'}
        className={''}
      > {l.label}
      </Link>)
  })
  navDrawerItems.unshift(<Link
    to={'/'}
    key={'/'}
    title={'Home'}
    variant={'navDrawer'}
    className={''}
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
    }} onClick={() => setShowSearch(!showSearch)} title='show search'>
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

    }} className='menu' onClick={() => setShowMenu(!showMenu)} title='show menu'>
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
          display: showMenu ? 'block' : 'none',
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
      {showMenu ? (
        <nav id='drawer' sx={{
          m: 0,
          p: '20px',
          position: 'fixed',
          top: '0',
          right: '0px',
          height: '100%',
          width: '14rem',
          background: 'white',
          overflowX: 'hidden',
          overflowY: 'scroll',
          bg: 'gray.2',
          borderLeft: '1px solid gray.4',
          boxShadow: '0 0 8px 0 rgb(0 0 0 / 25%)',
          overflowScrolling: 'touch',
          zIndex: 10,
        }}>
          {navDrawerItems}
        </nav>
      ) : null }
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
        }}>
          {children}
        </main>
        {siteFooter}
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
