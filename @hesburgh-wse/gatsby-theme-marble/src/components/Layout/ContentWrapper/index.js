import React from 'react'
import PropTypes from 'prop-types'
import style from './style.module.css'

const ContentWrapper = ({
  noPadding,
  children,
}) => {
  return (
    <React.Fragment>
      <div className={noPadding ? style.noMainPadding : style.mainPadding}>
        {children}
      </div>
    </React.Fragment>
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
