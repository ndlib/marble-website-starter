/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import PropTypes from 'prop-types'
import ReactModal from 'react-modal'
import typy from 'typy'
import { BaseStyles, useThemeUI, jsx } from 'theme-ui'
import sx from './sx'

const ViewerModal = ({
  contentLabel,
  isOpen,
  closeFunc,
  children,
  externalLink,
}) => {
  const context = useThemeUI()
  const iconColor = typy(context, 'theme.colors.background').safeString || '#fff'
  const appElement = typeof document !== 'undefined' ? document.getElementById('gatsby-focus-wrapper') : null
  return (
    <ReactModal
      style={modalStyle}
      closeTimeoutMS={200}
      appElement={appElement}
      isOpen={isOpen}
      contentLabel={contentLabel}
      onRequestClose={closeFunc}
      shouldCloseOnOverlayClick
    >
      <div sx={sx.wrapper}>
        {
          externalLink ? (
            <a
              href={externalLink}
              rel='nofollow noreferrer'
              target='_blank'
              style={{
                color: iconColor,
                textDecoration: 'none',
              }}
            >
              <h1 sx={sx.heading}>

                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  fill={iconColor}
                  width='24px'
                  height='24px'
                  sx={{
                    display: 'inline',
                    verticalAlign: 'top',
                  }}
                >
                  <path
                    d='M0 0h24v24H0z'
                    fill='none'
                  />
                  <path
                    d='M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z'
                  />
                </svg>
                &nbsp;
                {contentLabel}
              </h1>
            </a>
          ) : (
            <h1
              sx={sx.heading}
              dangerouslySetInnerHTML={{ __html: contentLabel }}
            />
          )
        }
        <button
          onClick={closeFunc}
          sx={sx.button}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            sx={sx.svg}
          >
            <path
              d='M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z'
              fill={iconColor}
            />
            <path
              d='M0 0h24v24H0z'
              fill='none'
            />
          </svg>
        </button>
      </div>
      <BaseStyles>
        <div sx={sx.content}>{children}</div>
      </BaseStyles>
    </ReactModal>
  )
}

ViewerModal.propTypes = {
  contentLabel: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  closeFunc: PropTypes.func.isRequired,
  children: PropTypes.node,
  externalLink: PropTypes.string,
}

export default ViewerModal

export const modalStyle = {
  overlay: {
    zIndex: '10',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  content: {
    border: 'none',
    padding: '0',
    top: '0px',
    left: '50%',
    right: 'auto',
    bottom: '0px',
    marginRight: '-50%',
    position: 'absolute',
    overflow: 'hidden',
    height: '100vh',
    width: '100vw',
    maxWidth: '100vw',
  },
}
