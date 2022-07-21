/** @jsx jsx */
import React, { useState } from 'react'
import { jsx } from 'theme-ui'
import PropTypes from 'prop-types'
import typy from 'typy'
import CardGroup from 'components/Shared/DisplayCard/CardGroup'
import MarbleItemCard from 'components/Shared/DisplayCard/MarbleItemCard'
import Pager from './Pager'
import ShowAll from './Pager/ShowAll'
import findImage from 'utils/findImage'

export const ChildManifests = ({ marbleItem }) => {
  const defaultLength = 30
  const childItems = typy(marbleItem, 'childrenMarbleItem').safeArray
  const [startIndex, setStart] = useState(0)
  const [endIndex, setEndIndex] = useState(defaultLength)
  const [activeChildren, setActiveChildren] = useState(typy(marbleItem, 'childrenMarbleItem').safeArray.slice(startIndex, endIndex))

  const updateAll = (newStart, newEnd) => {
    setStart(newStart)
    setEndIndex(newEnd)
    setActiveChildren(childItems.slice(newStart, newEnd))
  }

  if (!marbleItem || !typy(marbleItem, 'childrenMarbleItem').isArray) {
    return null
  }
  return (
    <>
      <h2 className='accessibilityOnly'>Related Items</h2>
      <CardGroup defaultDisplay='grid' toggleGroup='related-items' gridWidthRule={['100%', '100%', '50%', '100%', '50%']}>
        {
          activeChildren.map((childItem, i) => {
            if (!childItem) {
              return null
            }
            return (
              <MarbleItemCard
                key={childItem}
                target={childItem.slug}
                image={findImage(childItem.childrenMarbleFile, childItem, true)}
                title={childItem.title}
              />
            )
          })
        }

      </CardGroup>
      <Pager
        items={childItems}
        updateItems={updateAll}
        startIndex={startIndex}
        endIndex={endIndex}
        defaultLength={defaultLength}
      />
      <ShowAll
        items={childItems}
        updateItems={updateAll}
        defaultLength={defaultLength}
      />
    </>
  )
}

ChildManifests.propTypes = {
  marbleItem: PropTypes.object,
}

export default ChildManifests
