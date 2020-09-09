/** @jsx jsx */
import React from 'react'
import PropTypes from 'prop-types'
import typy from 'typy'
import { jsx } from 'theme-ui'
import sx from '../sx'

export const ManifestCardChildren = ({ parentProps, item }) => {
  const dates = findMetadata(item, ['date', 'dates'])
  const creator = findCreator(item, parentProps)
  return (
    <>
      {
        parentProps.showCreator ? (
          <p
            sx={sx.lineStyle}
            dangerouslySetInnerHTML={{ __html: creator }}
          />
        ) : null
      }
      {
        parentProps.showDate ? (
          <p
            sx={sx.lineStyle}
            dangerouslySetInnerHTML={{ __html: dates }}
          />
        ) : null
      }
      {parentProps.showSummary ? <div>{item.description}</div> : null}
      {parentProps.children ? parentProps.children : null}
    </>
  )
}

ManifestCardChildren.propTypes = {
  parentProps: PropTypes.object,
  item: PropTypes.object,
}
export default ManifestCardChildren

export const findMetadata = (manifest, options) => {
  if (!manifest.metadata) {
    return []
  }

  return manifest.metadata.reduce((metaValue, row) => {
    const label = typy(row, 'label').safeString.toLowerCase()

    if (options.includes(label)) {
      return metaValue.concat(row.value.join('<br/>'))
    }

    return metaValue
  }, [])
}

export const findCreator = (item, parentProps) => {
  if (parentProps.highlight && parentProps.highlight['creator.folded']) {
    return parentProps.highlight['creator.folded'][0]
  } else {
    return findMetadata(item, ['creator'])
  }
}
