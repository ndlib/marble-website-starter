/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import PropTypes from 'prop-types'
import { jsx, Box, Heading, Flex } from 'theme-ui'
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
  console.log(variant)
  return (
    <Box as='header' sx={{
      variant: 'NDBrandHeader',
      gridRow: 'header',
      width: '100vw',
      opacity: '1',
      zIndex: 1,
    }}>
      <Flex sx={{ width: '90vw', mx: '5vw', flexDirection: 'row-reverse', justifyContent: 'space-between' }}>
        <div className='mark' sx={{
          width: '200px',
        }}>
          <ClickableNDLogoWhite />
        </div>
        <div className='title' sx={{}}>
          <Heading as='h1' variant='siteHeader'><Link variant='siteHeader' to='/'>{title}</Link></Heading>
          {site.siteMetadata.subTitle ? (<p sx={{
            color: 'white',
            my: 0,
            mt: '-15px',
            py: 0,
            fontFamily: 'serif',
            fontSize: '2',

            position: 'relative',
          }}>{site.siteMetadata.subTitle}</p>) : null }
        </div>
      </Flex>
      <Box className='nav' sx={{ maxHeight: ['75px', '75px', '75px', 0] }}>
        <Box as='nav' sx={{ variant: `menus.navTop` }}>
          <div>
            {!showSearch ? (
              menuItems
            ) : (
              <NDBrandNavSearch location={location} searchPath='search' setShowSearch={setShowSearch} />
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
  variant: 'header',
  additionalNavButtons: [],
  showSearch: false,
}

export default NDBrandHeader
