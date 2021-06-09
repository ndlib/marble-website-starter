/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { jsx, Box, Heading, Flex } from 'theme-ui'
import { graphql, useStaticQuery } from 'gatsby'
import ClickableNDLogoWhite from '../Logos/ClickableNDLogoWhite'
import NDBrandNavSearch from './NavSearch'
import typy from 'typy'

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
export const NDBrandHeader = ({ location, variant, titleOverride, menuItems }) => {
  const { site } = useStaticQuery(query)
  const [showSearch, setShowSearch] = useState(false)

  const title = titleOverride || site.siteMetadata.title

  return (
    <Box as='header' variant={'header.' + variant} sx={{
      gridRow: 'header',
      padding: '1.5rem 0 0',
      display: 'grid',
      width: '100vw',
      textAlign: 'left',
      borderTopWidth: '5px',
      borderTopColor: 'secondary',
      borderTopStyle: 'solid',
      backgroundColor: 'primary',
      borderBottomWidth: '5px',
      borderBottomColor: 'dark',
      borderBottomStyle: 'solid',
      opacity: '1',
      zIndex: 1,
    }}>
      <Flex sx={{ width: '90vw', mx: '5vw', flexDirection: 'row-reverse', justifyContent: 'space-between' }}>
        <div className='mark' sx={{
          width: '200px',
        }}>
          <ClickableNDLogoWhite />
        </div>
        <div className='title' sx={{
          width: '300px',
        }}>
          <Heading as='h1' sx={{
            color: 'gray.4',
            m: 0,
            p: 0,
            fontFamily: 'title',
            fontSize: '8',
          }}>{title}</Heading>
          {site.siteMetadata.subTitle ? (<p sx={{
            color: 'white',
            my: 0,
            py: 0,
            marginLeft: '120px',
            fontFamily: 'serif',
            fontSize: '2',
            top: '-13px',
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
}

NDBrandHeader.defaultProps = {
  variant: 'default',
  additionalNavButtons: [],
}

export default NDBrandHeader
