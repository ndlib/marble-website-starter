/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import PropTypes from 'prop-types'
import { jsx } from 'theme-ui'
import typy from 'typy'
import sx from '../sx'

// eslint-disable-next-line complexity
export const ManifestCardChildren = ({ parentProps, date, creator }) => {
  return (
    <>
      {
        creator ? (
          <p
            sx={sx.lineStyle}
            dangerouslySetInnerHTML={{ __html: typy(creator).isArray ? creator.join('<br/>') : creator }}
          />
        ) : null
      }{
        date ? (
          <p
            sx={sx.lineStyle}
            dangerouslySetInnerHTML={{ __html: typy(date).isArray ? date.join('<br/>') : date }}
          />
        ) : null
      }
      {parentProps.children ? parentProps.children : null}
    </>
  )
}

ManifestCardChildren.propTypes = {
  date: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
  ]),
  creator: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
  ]),
  parentProps: PropTypes.object,
}
export default ManifestCardChildren
