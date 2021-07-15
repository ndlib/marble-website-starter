/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import PropTypes from 'prop-types'
import Link from 'components/Shared/Link'
import { jsx, Heading } from 'theme-ui'
import typy from 'typy'
import CardGroup from 'components/Shared/CardGroup'
import ManifestCard from 'components/Shared/ManifestCard'
import getArrayNeighbors from 'utils/getArrayNeighbors'
import findImage from 'utils/findImage'
import { DISPLAY_GRID } from 'store/actions/displayActions'

const SiblingItems = ({ marbleItem, numberBeforeAndAfter }) => {
  const siblings = typy(marbleItem, 'marbleParent.childrenMarbleItem').safeArray

  if (siblings.length > 1) {
    const thisItemIndex = siblings.findIndex(item => item.slug === marbleItem.slug)
    const nearSiblings = getArrayNeighbors(siblings, thisItemIndex, numberBeforeAndAfter)

    return (
      <>
        <Heading as='h2'>Also from&nbsp;
          <Link
            to={typy(marbleItem, 'marbleParent.slug').safeString}
            sx={{ textDecoration: 'none' }}
          >
            <i>{typy(marbleItem, 'marbleParent.title').safeString}</i>
          </Link>
        </Heading>
        <CardGroup defaultDisplay={DISPLAY_GRID} toggleGroup='sibling-items'>
          {
            nearSiblings.map(sibling => {
              return (
                <ManifestCard
                  key={sibling.slug}
                  target={sibling.slug}
                  image={findImage(sibling.childrenMarbleFile, sibling, true)}
                  label={sibling.title}
                  showSummary
                />
              )
            })
          }
        </CardGroup>
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
