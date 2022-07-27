/** @jsx jsx */
import React, { useState, useEffect } from 'react'
import { jsx } from 'theme-ui'
import PropTypes from 'prop-types'
import typy from 'typy'
import { useLocation } from '@reach/router'
import queryString from 'query-string'
import CardGroup from 'components/Shared/DisplayCard/CardGroup'
import MarbleItemCard from 'components/Shared/DisplayCard/MarbleItemCard'
import Pager from './Pager'
import ShowAll from './Pager/ShowAll'
import findImage from 'utils/findImage'

export const ChildManifests = ({ marbleItem }) => {
  const location = useLocation()
  const defaultLength = 30
  const childItems = typy(marbleItem, 'childrenMarbleItem').safeArray

  const [pageNumber, setPageNumber] = useState(() => getPageNumber(location))

  const [activeChildren, setActiveChildren] = useState(() => initActiveChildren(pageNumber, childItems))

  useEffect(() => {
    setPageNumber(getPageNumber(location))
    if (pageNumber === 0) {
      setActiveChildren(childItems)
    } else if (pageNumber) {
      setActiveChildren(childItems.slice(startFromPage(pageNumber), endFromPage(pageNumber, childItems.length)))
    }
  }, [pageNumber, location, childItems])

  if (!marbleItem || !typy(marbleItem, 'childrenMarbleItem').isArray) {
    return null
  }
  return (
    <>
      <h2 className='accessibilityOnly'>Related Items</h2>
      <CardGroup defaultDisplay='grid' toggleGroup='related-items' gridWidthRule={['100%', '100%', '50%', '100%', '50%']}>
        {
          activeChildren.map(childItem => {
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
        defaultLength={defaultLength}
        pageNumber={pageNumber}
      />
      <ShowAll
        items={childItems}
        defaultLength={defaultLength}
        pageNumber={pageNumber}
      />
    </>
  )
}

ChildManifests.propTypes = {
  marbleItem: PropTypes.object,
}

export default ChildManifests

const initActiveChildren = (pageNumber, items) => {
  if (pageNumber === 0) {
    return items
  }
  return items.slice(startFromPage(pageNumber), endFromPage(pageNumber))
}

const getPageNumber = (location) => {
  const { p } = queryString.parse(location.search)
  if (!isNaN(parseInt(p, 10))) {
    return parseInt(p, 10)
  }
  return 1
}
const startFromPage = (pageNumber, defaultLength = 30) => {
  if (pageNumber === 0) {
    return 0
  } else if (typeof parseInt(pageNumber, 10) === 'number') {
    return (parseInt(pageNumber, 10) - 1) * defaultLength
  }
  return 1
}
const endFromPage = (pageNumber, maxLength, defaultLength = 30) => {
  if (pageNumber === 0) {
    return maxLength
  } else if (!isNaN(pageNumber)) {
    return pageNumber * defaultLength
  }
  return defaultLength
}
