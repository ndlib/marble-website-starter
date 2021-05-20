/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import PropTypes from 'prop-types'
import { jsx, Flex, Box } from 'theme-ui'

export const NDBrandSection = ({ location, variant, image, children, ...props }) => {
  const sectionSx = {}
  const imageTag = (image) ? (<Flex className='sectionImage' sx={{ width: '25%' }}>{image}</Flex>) : null
  if (image) {
    sectionSx['width'] = '75%'
  }

  return (
    <Flex as='section' variant={`sections.${variant}`} {...props}>
      {imageTag}
      <Box as='div' className='sectionContent' sx={sectionSx}>
        {children}
      </Box>
    </Flex>
  )
}

NDBrandSection.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.string.isRequired,
  location: PropTypes.object.isRequired,
  image: PropTypes.object,
  props: PropTypes.object,
}

NDBrandSection.defaultProps = {
  variant: 'default',
}

export default NDBrandSection
