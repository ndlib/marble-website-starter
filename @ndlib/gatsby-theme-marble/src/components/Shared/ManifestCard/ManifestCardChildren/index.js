/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import PropTypes from 'prop-types'
import { jsx } from 'theme-ui'
import sx from '../sx'

export const ManifestCardChildren = ({ parentProps, date, creator }) => {
  return (
    <>
      {
        creator ? (
          <p
            sx={sx.lineStyle}
            dangerouslySetInnerHTML={{ __html: creator }}
          />
        ) : null
      }{
        date ? (
          <p
            sx={sx.lineStyle}
            dangerouslySetInnerHTML={{ __html: date }}
          />
        ) : null
      }
      {parentProps.children ? parentProps.children : null}
    </>
  )
}

ManifestCardChildren.propTypes = {
  date: PropTypes.string,
  creator: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  parentProps: PropTypes.object,
}
export default ManifestCardChildren
