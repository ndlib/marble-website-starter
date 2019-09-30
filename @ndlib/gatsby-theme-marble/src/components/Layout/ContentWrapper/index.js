import React from 'react'
import PropTypes from 'prop-types'
import style from './style.module.css'

const ContentWrapper = ({
  noPadding,
  children,
}) => {
  return (
    <div className={noPadding ? style.noMainPadding : style.mainPadding}>
      {children}
    </div>
  )
}

ContentWrapper.propTypes = {
  noPadding: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
}

ContentWrapper.defaultProps = {
  noPadding: false,
}
export default ContentWrapper
