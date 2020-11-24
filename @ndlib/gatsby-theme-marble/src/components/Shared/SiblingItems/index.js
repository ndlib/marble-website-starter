/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import PropTypes from 'prop-types'
import Link from 'components/Internal/Link'
import { jsx, BaseStyles } from 'theme-ui'
import typy from 'typy'
import DisplayViewToggle from 'components/Internal/DisplayViewToggle'
import ManifestCard from 'components/Shared/ManifestCard'
import getArrayNeighbors from 'utils/getArrayNeighbors'

const SiblingItems = ({ marbleItem, numberBeforeAndAfter }) => {
  const siblings = typy(marbleItem, 'marbleParent.childrenMarbleItem').safeArray

  if (siblings.length > 1) {
    const thisItemIndex = siblings.findIndex(item => item.slug === marbleItem.slug)
    const nearSiblings = getArrayNeighbors(siblings, thisItemIndex, numberBeforeAndAfter)

    return (
      <>
        <BaseStyles>
          <h2>Also from&nbsp;
            <Link
              to={typy(marbleItem, 'marbleParent.slug').safeString}
              sx={{ textDecoration: 'none' }}
            >
              <i>{typy(marbleItem, 'marbleParent.title').safeString}</i>
            </Link>
          </h2>
        </BaseStyles>
        <DisplayViewToggle>
          {
            nearSiblings.map(sibling => {
              return (
                <ManifestCard
                  key={sibling.slug}
                  target={sibling.slug}
                  image={typy(sibling, 'childrenMarbleFile[0].iiif.thumbnail').safeString}
                  label={sibling.title}
                  showSummary
                />
              )
            })
          }
        </DisplayViewToggle>
      </>
    )
  }
  return null
}

SiblingItems.propTypes = {
  marbleItem: PropTypes.object,
  numberBeforeAndAfter: PropTypes.number,
}

SiblingItems.defaultProps = {
  numberBeforeAndAfter: 3,
}
export default SiblingItems
