/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import PropTypes from 'prop-types'
import { jsx, Flex, Heading, Box } from 'theme-ui'

export const NDBrandHeroFullBleed = ({ variant, image, lede, title, button }) => {
  const gutterWidth = '5vw'

  return (
    <Box id='page-header' variant={`hero.${variant}`} sx={{
      display: 'grid',
      pb: '2rem',
      gridTemplateRows: '[header-start] 5rem [title-start] auto [title-end lede-start] auto [lede-end] 3.5rem [header-end]',
      gridTemplateColumns: `[screen-start] ${gutterWidth} [container-start title-start] 2fr [title-end image-start] 2fr [image-end container-end] ${gutterWidth} [screen-end]`,
    }}>
      <Flex className='lede' sx={{
        gridColumn: '1/3',
        gridRow: '3',
        bg: 'white',
        pr: '2rem',
        alignItems: 'flex-start',
        flexDirection: 'column',
        zIndex: 1,
        display: ['none', 'none', 'none', 'block'],
      }}>
        {lede ? (<Heading as='h1' variant='pageTitle' sx={{ ml: '5vw', marginTop: '.5rem', fontSize: 1, alignSelf: 'flex-end' }}>{lede}</Heading>) : null }
        {button ? (
          <Flex sx={{ alignItems: 'end', justifyItems: 'end', width: '100%', flexDirection: 'row', pl: '5vw' }}>
            {button}
          </Flex>) : null }
      </Flex>
      <div sx={{
        gridRow: '1/-1',
        gridColumn: 'screen',
        maxHeight: '80vw',
        maxWidth: 'none',
      }}>
        {image}
      </div>
    </Box>

  )
}

NDBrandHeroFullBleed.propTypes = {
  variant: PropTypes.string.isRequired,
  image: PropTypes.object,
  button: PropTypes.object,
  title: PropTypes.string,
  lede: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
}

NDBrandHeroFullBleed.defaultProps = {
  variant: 'fullBleed',
}

export default NDBrandHeroFullBleed
