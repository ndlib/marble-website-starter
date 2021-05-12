/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react'
import { jsx, Container } from 'theme-ui'
import PropTypes from 'prop-types'

const gutterWidth = '5vw'

const NDBrandLayout = ({ location, children, pageHeader, siteHeader, siteFooter }) => {
  return (
    <Container sx={{
      display: 'grid',
      minHeight: '100%',
      gridTemplateRows: '[header-start] auto [header-end main-start] minmax(auto, 1fr) [main-end footer-start] auto [footer-end]',
    }}>
      {siteHeader}
      <div id='content' sx={{
        gridTemplateColumns: `[screen-start] ${gutterWidth} [container-start sidebar-start] 22vw [sidebar-end content-start] minmax(0, 1fr) [content-end container-end] ${gutterWidth} [screen-end]`,
        gridTemplateRows: `[header-start] auto [header-end content-start] 1fr [content-end]`,
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
            width: '100vw',
            zIndex: '-1',
            background: '#fff',
          },
        }}>
          {children}
        </main>
        {siteFooter}
      </div>
    </Container>
  )
}

NDBrandLayout.propTypes = {
  location: PropTypes.object.isRequired,
  children: PropTypes.array.isRequired,
  pageHeader: PropTypes.object,
  siteHeader: PropTypes.object,
  siteFooter: PropTypes.object,
}
export default NDBrandLayout
