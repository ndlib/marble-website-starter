/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'
import typy from 'typy'
import { useThemeUI, jsx } from 'theme-ui'
import sx from './sx'

const ShareModalContent = ({ iiifManifest }) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            siteUrl
          }
        }
      }
    `,
  )
  const [isCopied, setIsCopied] = useState(false)
  const inputRef = useRef(null)
  const fullPath = `${typy(site, 'siteMetadata.siteUrl').safeString}/${typy(iiifManifest, 'slug').safeString}`
  const context = useThemeUI()
  const iconColor = typy(context, 'theme.colors.background').safeString || '#fff'
  return (
    <React.Fragment>
      <input
        ref={inputRef}
        value={fullPath}
        onClick={() => onClick(inputRef, setIsCopied)}
        sx={sx.input}
        readOnly
      />
      <button
        onClick={() => onClick(inputRef, setIsCopied)}
        sx={sx.button}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          height='20'
          viewBox='0 0 24 24'
          width='20'
          sx={sx.svg}
        >
          <path
            d='M0 0h24v24H0z'
            fill='none' />
          <path
            d='M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm-1 4l6 6v10c0 1.1-.9 2-2 2H7.99C6.89 23 6 22.1 6 21l.01-14c0-1.1.89-2 1.99-2h7zm-1 7h5.5L14 6.5V12z'
            fill={iconColor}
          />
        </svg>
      </button>
      {
        isCopied ? (
          <em
            sx={sx.copied}>Copied to clipboard</em>
        ) : null
      }
    </React.Fragment>
  )
}

ShareModalContent.propTypes = {
  iiifManifest: PropTypes.shape({
    slug: PropTypes.string.isRequired,
  }).isRequired,
}

export default ShareModalContent

const onClick = (ref, callbackFunc) => {
  ref.current.select()
  document ? document.execCommand('copy') : console.warn('document not defined')
  ref.current.focus()
  callbackFunc(true)
}
