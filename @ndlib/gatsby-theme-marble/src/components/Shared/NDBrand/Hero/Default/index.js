/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import PropTypes from 'prop-types'
import { jsx, Flex, Heading } from 'theme-ui'
import sx from './sx'

export const NDBrandHeroDefault = ({ variant, image, lede, title, button }) => {
  return (
    <div id='page-header' variant={`pageHeaders.${variant}`} sx={sx.defaultHeroBanner}>
      <Heading as='h1' variant='pageTitle' sx={sx.bannerHeading}>
        {title}
      </Heading>
      <Flex sx={sx.descriptionSection}>
        <p variant='lede' sx={sx.descriptionText}>
          {lede}
        </p>
        <Flex sx={sx.descriptionButton}>
          {button}
        </Flex>
      </Flex>
      <div sx={sx.bannerImageContainer}>
        {image}
      </div>
    </div>
  )
}

NDBrandHeroDefault.propTypes = {
  variant: PropTypes.string.isRequired,
  image: PropTypes.object,
  button: PropTypes.object,
  title: PropTypes.string,
  lede: PropTypes.string,
}

NDBrandHeroDefault.defaultProps = {
  variant: 'default',
}

export default NDBrandHeroDefault
