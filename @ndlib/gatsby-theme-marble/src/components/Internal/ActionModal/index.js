/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import PropTypes from 'prop-types'
import ReactModal from 'react-modal'
import typy from 'typy'
import { BaseStyles, useThemeUI, jsx } from 'theme-ui'
import sx from './sx'

const ActionModal = ({
  contentLabel,
  isOpen,
  closeFunc,
  fullscreen = false,
  children,
}) => {
  const context = useThemeUI()
  const iconColor = typy(context, 'theme.colors.background').safeString || '#fff'
  const appElement = typeof document !== 'undefined' ? document.getElementById('gatsby-focus-wrapper') : null
  return (
    <ReactModal
      style={modalStyle(fullscreen)}
      closeTimeoutMS={200}
      appElement={appElement}
      isOpen={isOpen}
      contentLabel={contentLabel}
      onRequestClose={closeFunc}
      shouldCloseOnOverlayClick
    >
      <div
        sx={sx.wrapper}>
        <h1
          sx={sx.heading}
        >{contentLabel}</h1>
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
              fill={iconColor} />
            <path
              d='M0 0h24v24H0z'
              fill='none'
            />
          </svg>
        </button>
      </div>
      <BaseStyles>
        <div
          sx={sx.content}>{ children }</div>
      </BaseStyles>
    </ReactModal>
  )
}

ActionModal.propTypes = {
  contentLabel: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  closeFunc: PropTypes.func.isRequired,
  fullscreen: PropTypes.bool,
  children: PropTypes.node,
}

export default ActionModal

export const modalStyle = (fullscreen) => {
  return {
    overlay: {
      zIndex: '10',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    content: {
      border: 'none',
      borderRadius: '.5rem',
      padding: '0',
      top: '40px',
      left: '50%',
      right: 'auto',
      bottom: fullscreen ? '40px' : 'auto',
      marginRight: '-50%',
      height: fullscreen ? 'calc(100vh - 80px)' : 'auto',
      width: fullscreen ? '95vw' : '500px',
      maxWidth: '95vw',
    },
  }
}
