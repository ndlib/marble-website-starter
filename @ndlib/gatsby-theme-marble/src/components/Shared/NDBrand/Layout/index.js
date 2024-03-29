/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect, useRef } from 'react'
import { jsx, Container, Button } from 'theme-ui'
import PropTypes from 'prop-types'
import { graphql, useStaticQuery } from 'gatsby'
import NDBrandHeader from '@ndlib/gatsby-theme-marble/src/components/Shared/NDBrand/Header'
import NDBrandDrawer from '@ndlib/gatsby-theme-marble/src/components/Shared/NDBrand/Drawer'
import Link from '@ndlib/gatsby-theme-marble/src/components/Shared/Link'
import { FaHome, FaSearch, FaGripLines, FaTimes } from 'react-icons/fa'
import typy from 'typy'
import { selectedUrl } from '@ndlib/gatsby-theme-marble/src/components/Shared/Menu'
import sx from './sx'

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
    menusJson(menuId: {eq: "header"}) {
      menuId
      label
      items {
        menuId
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
  const menuButtonRef = useRef()
  const menuId = 'mainMenu'

  useEffect(() => {
    if (showMenu) {
      // focus on the first element in the side menu.
      setTimeout(() => {
        menuStartRef.current.focus()
      }, 500)
    } else {
      setTimeout(() => {
        // focus on the menu button again.
        menuButtonRef.current.focus()
      }, 50)
    }
  }, [menuStartRef, showMenu])

  const navDrawerItems = menu.map((l) => {
    return (
      <Link
        to={l.link}
        key={l.menuId}
        title={l.label}
        variant={'navDrawer'}
        className={selectedUrl(l, location) ? ' selected' : ''}
      > {l.label}
      </Link>)
  })
  navDrawerItems.unshift(<Link
    to={'/'}
    key={'/'}
    title={'Home'}
    variant={'navDrawer'}
    className={selectedUrl({ selectedPatterns: ['^/$'] }, location) ? ' selected' : ''}
    innerRef={menuStartRef}
  >Home
  </Link>)

  const items = menu.map(l => {
    return (
      <Link
        to={l.link}
        key={l.menuId}
        title={l.label}
        variant={'navTop'}
        className={'menuLinks' + (selectedUrl(l, location) ? ' selected' : '')}
      > {l.label}
      </Link>)
  })

  items.unshift(
    <Link
      to={'/'}
      key={'/'}
      title={'Home'}
      variant={'navTop'}
      className={selectedUrl({ selectedPatterns: ['^/$'] }, location) ? ' selected' : ''}
    > <FaHome />
      <span>Home</span>
    </Link>)

  items.push((
    <Button
      variant='links.navTop'
      sx={sx.navButton} key='toggle-search' onClick={() => setShowSearch(!showSearch)} title='show search'>
      <FaSearch />
      <span>Search</span>
    </Button>),
  )
  items.push((
    <Button
      variant='links.navTop'
      sx={sx.navButton}
      className='menu'
      onClick={() => setShowMenu(!showMenu)}
      title='Toggle Menu'
      ariacontrols={menuId}
      key='toggle-menu'
      ref={menuButtonRef}
    >
      { showMenu ? <FaTimes /> : (<><FaGripLines /><span>Menu</span></>) }
    </Button>),
  )

  return (
    <Container sx={sx.layoutContainer({ variant, showMenu })}>
      <NDBrandDrawer navDrawerItems={navDrawerItems} showMenu={showMenu} setShowMenu={setShowMenu} menuId={menuId} />
      <div id='nav-background' aria-hidden={showMenu ? 'true' : 'false'}>
        <NDBrandHeader
          location={location}
          titleOverride={titleOverride}
          menuItems={items}
          setShowSearch={setShowSearch}
          showSearch={showSearch}
        />
        <div id='content' sx={sx.content}>
          {pageHeader}
          <section sx={sx.contentSection}>
            {children}
          </section>
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
