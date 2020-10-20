/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import PropTypes from 'prop-types'
import { jsx } from 'theme-ui'
import ChildField from './ChildField'

export const ManifestCardChildren = ({ parentProps, date, creator }) => {
  return (
    <>
      <ChildField field={creator} />
      <ChildField field={date} />
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
