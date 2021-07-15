/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import PropTypes from 'prop-types'
import { jsx, Flex, Heading, Box } from 'theme-ui'
import Link from '@ndlib/gatsby-theme-marble/src/components/Shared/Link'

export const NDBrandHeroFullBleed = ({ variant, image, title, button, link, attribution }) => {
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
        {title ? (<Heading as='h2' variant='pageTitle' sx={{ ml: '5vw', marginTop: '.5rem', alignSelf: 'flex-end' }}>{title}</Heading>) : null }
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
        <Link to={link} title={attribution}>
          {image}
          {attribution ? (<span sx={{ position: 'relative', bottom: '1.5rem', color: 'white', left: '75vw', px:'1rem', bg: 'gray.8' }}>{attribution}</span>) : null}
        </Link></div>
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
