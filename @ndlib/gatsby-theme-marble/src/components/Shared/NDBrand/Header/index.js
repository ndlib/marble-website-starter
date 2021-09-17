/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import PropTypes from 'prop-types'
import { jsx, Box, Heading } from 'theme-ui'
import { graphql, useStaticQuery } from 'gatsby'
import ClickableNDLogoWhite from '../Logos/ClickableNDLogoWhite'
import Link from '@ndlib/gatsby-theme-marble/src/components/Shared/Link'
import NDBrandNavSearch from './NavSearch'

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
/*
* Builds and ND Webtheme header.
* Needs:  a json menu file with a header navigation in it. content/json/menus/header.json usually
* Reads the site title and subtitle out of siteMetadata
* Params:
* location - Gatsby Location Object.
* variant - used to set a configurable variant in the theme file.
*           Defaults to default
*/
export const NDBrandHeader = ({ location, variant, titleOverride, menuItems, showSearch, setShowSearch }) => {
  const { site } = useStaticQuery(query)

  const title = titleOverride || site.siteMetadata.title
  return (
    <Box as='header' sx={{
      variant: variant,
      gridRow: 'header',
      width: '100%',
      opacity: '1',
      zIndex: 1,
    }}>
      <Box className='titleContainer' sx={{ display: ['block', 'block', 'flex'], width: '100%', flexDirection: 'row-reverse', justifyContent: 'space-between' }}>
        <div className='mark' sx={{
          width: ['100%', '100%', '200px'],
          bg: ['primaryDark', 'primaryDark', 'primary'],
          mx: ['auto', 'auto', '5vw'],
          display: ['flex', 'flex', 'block'],
          justifyContent: ['center', 'center', 'inherit'],
          py: ['15px', '15px', '0'],
        }}
        >
          <ClickableNDLogoWhite sx={{ display: ['none', 'none', 'block'] }} />
          <img
            src='https://static.nd.edu/images/brandbar/dept-nd-white.svg'
            alt='Universtiy of Notre Dame'
            width='300'
            height='16'
            sx={{ display: ['block', 'block', 'none'] }} />
        </div>
        <div className='title' sx={{ mx: '5vw' }}>
          <Heading as='h1' variant='siteHeader'>
            <Link variant='siteHeader' to='/'>{title}</Link>
          </Heading>
          {site.siteMetadata.subTitle && !titleOverride
            ? (<p sx={{
              color: 'white',
              my: 0,
              mt: '-15px',
              py: 0,
              fontFamily: 'serif',
              fontSize: '2',

              position: 'relative',
            }}>{site.siteMetadata.subTitle}</p>)
            : null }
        </div>
      </Box>
      <Box className='nav' sx={{ maxHeight: ['75px', '75px', '75px', 0] }}>
        <Box as='nav' sx={{ variant: 'menus.navTop' }}>
          <div>
            {!showSearch
              ? (
                menuItems
              )
              : (
                <NDBrandNavSearch key='search' location={location} searchPath='search' setShowSearch={setShowSearch} />
              )}
          </div>
        </Box>
      </Box>
    </Box>
  )
}

NDBrandHeader.propTypes = {
  variant: PropTypes.string.isRequired,
  location: PropTypes.object.isRequired,
  titleOverride: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
  ]),
  menuItems: PropTypes.node,
  showSearch: PropTypes.bool,
  setShowSearch: PropTypes.func,
}

NDBrandHeader.defaultProps = {
  variant: 'NDBrandHeader',
  additionalNavButtons: [],
  showSearch: false,
}

export default NDBrandHeader
