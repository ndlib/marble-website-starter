/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { jsx, Box, Button, Heading, Flex } from 'theme-ui'
import { graphql, useStaticQuery } from 'gatsby'
import ClickableNDLogoWhite from '../Logos/ClickableNDLogoWhite'
import NDBrandNavSearch from './NavSearch'
import Menu from '@ndlib/gatsby-theme-marble/src/components/Shared/Menu'
import typy from 'typy'

/*
* Builds and ND Webtheme Header Navigation.
* Needs:  a json menu file with a header navigation in it. content/json/menus/header.json usually
* Reads the site title and subtitle out of siteMetadata
* Params:
* location - Gatsby Location Object.
* variant - used to set a configurable variant in the theme file.
*           Defaults to default
*/

export const NDBrandHeader = ({ location, variant, items }) => {
  const [showSearch, setShowSearch] = useState(false)

  return (
    <Box className='nav' sx={{ maxHeight: 0 }}>
      <Box as='nav' sx={{ variant: `menus.navTop` }}>
        <div>
          {!showSearch ? (
            items
          ) : (
            <NDBrandNavSearch location={location} searchPath='search' setShowSearch={setShowSearch} />
          )}
        </div>
      </Box>

    </Box>
  )
}

NDBrandHeader.propTypes = {
  variant: PropTypes.string.isRequired,
  location: PropTypes.object.isRequired,
  items: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
}

NDBrandHeader.defaultProps = {
  variant: 'default',
  additionalNavButtons: [],
}

export default NDBrandHeader
