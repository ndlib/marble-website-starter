import React from 'react'
import PropTypes from 'prop-types'
import style from './style.module.css'

const ContentWrapper = ({
  preMain,
  noPadding,
  children,
}) => {
  return (
    <React.Fragment>
      <div className={noPadding ? style.noPreMainPadding : style.preMain}>{preMain}</div>
      <div className={noPadding ? style.noMainPadding : style.mainPadding}>
        {children}
      </div>
    </React.Fragment>
  )
}

ContentWrapper.propTypes = {
  preMain: PropTypes.node,
  noPadding: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
}

ContentWrapper.defaultProps = {
  preMain: null,
  noPadding: false,
}
export default ContentWrapper
