/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import PropTypes from 'prop-types'
import { jsx, Flex, Box } from 'theme-ui'

export const NDBrandSection = ({ variant, image, children, ...props }) => {
  const sectionSx = {
    'p:first-of-type': {
      mt: ['revert', 'revert', '0'],
    },
  }

  const containerSx = {}

  const imageTag = (image) ? (<Box className='sectionImage' sx={{ mr: '1rem' }}>{image}</Box>) : null
  if (image) {
    sectionSx.width = '100%'

    containerSx.flexWrap = ['wrap', 'wrap', 'nowrap']
  }

  return (
    <Flex as='section' variant={`sections.${variant}`} sx={containerSx} {...props}>
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
  image: PropTypes.object,
  props: PropTypes.object,
}

NDBrandSection.defaultProps = {
  variant: 'default',
}

export default NDBrandSection
