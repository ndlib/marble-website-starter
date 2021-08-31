/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import PropTypes from 'prop-types'
import { jsx, Flex, Heading, Box } from 'theme-ui'
import Link from '@ndlib/gatsby-theme-marble/src/components/Shared/Link'
import sx from './sx'

export const NDBrandHeroFullBleed = ({ variant, image, title, button, link, attribution }) => {
  return (
    <Box id='page-header' variant={`hero.${variant}`} sx={sx.bannerGrid}>
      <Flex className='lede' sx={sx.overlay}>
        {title && (
          <Heading as='h2' variant='pageTitle' sx={sx.overlayText}>
            {title}
          </Heading>
        )}
        {button && (
          <Flex sx={sx.overlayButton}>
            {button}
          </Flex>
        )}
      </Flex>
      <div sx={sx.banner}>
        <Link to={link} title={attribution}>
          {image}
          {attribution ? (<span sx={sx.attribution}>{attribution}</span>) : null}
        </Link>
      </div>
    </Box>

  )
}

NDBrandHeroFullBleed.propTypes = {
  variant: PropTypes.string.isRequired,
  image: PropTypes.object,
  button: PropTypes.object,
  title: PropTypes.string,
  attribution: PropTypes.string,
  link: PropTypes.string,
}

NDBrandHeroFullBleed.defaultProps = {
  variant: 'fullBleed',
}

export default NDBrandHeroFullBleed
