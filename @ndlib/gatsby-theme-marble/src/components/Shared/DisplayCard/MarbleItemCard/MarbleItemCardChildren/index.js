/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import PropTypes from 'prop-types'
import { jsx } from 'theme-ui'
import ChildField from './ChildField'
import typy from 'typy'

export const MarbleItemCardChildren = ({ parentProps, date, creator, collectionName }) => {
  const collectionDisplay = typy(collectionName, '[0]').safeString ? 'Part of: ' + collectionName[0] : ''
  return (
    <>
      <ChildField field={creator} />
      <ChildField field={date} />
      <ChildField field={collectionDisplay} />
      {parentProps.children ? parentProps.children : null}
    </>
  )
}

MarbleItemCardChildren.propTypes = {
  date: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
  ]),
  creator: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
  ]),
  collectionName: PropTypes.array,
  parentProps: PropTypes.object,
}
export default MarbleItemCardChildren
