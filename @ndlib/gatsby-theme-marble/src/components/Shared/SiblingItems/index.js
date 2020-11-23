/** @jsx jsx */
import PropTypes from 'prop-types'
import Link from 'components/Internal/Link'
import { jsx, BaseStyles } from 'theme-ui'
import typy from 'typy'
import DisplayViewToggle from 'components/Internal/DisplayViewToggle'
import ManifestCard from 'components/Shared/ManifestCard'

const SiblingItems = ({ marbleItem }) => {
  const siblings = typy(marbleItem, 'marbleParent.childrenMarbleItem').safeArray
  if (siblings.length > 1) {
    const thisItemIndex = siblings.findIndex(item => item.slug === marbleItem.slug)

    const nearSiblings = getNeighbors(siblings, thisItemIndex, 3)
    return (
      <BaseStyles>
        <h2>Also from&nbsp;
          <Link to={typy(marbleItem, 'marbleParent.slug').safeString} sx={{ textDecoration: 'none' }}>
            <i>{typy(marbleItem, 'marbleParent.title').safeString}</i>
          </Link>
        </h2>
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
      </BaseStyles>
    )
  }
  return null
}

SiblingItems.propTypes = {
  marbleItem: PropTypes.object,
}

export default SiblingItems

// eslint-disable-next-line complexity
const getNeighbors = (arr, index, numberDirection) => {
  const length = arr.length
  if (length <= (2 * numberDirection) + 1) {
    return arr.splice(index, 1)
  }
  const tempArr = []
  for (let i = numberDirection; i > 0; i--) {
    const tIndex = index - i >= 0 ? index - i : index - i + length
    tempArr.push(arr[tIndex])
  }
  for (let i = 1; i < 1 + numberDirection; i++) {
    const tIndex = i + index >= length ? i + index - length : i + index
    tempArr.push(arr[tIndex])
  }
  return tempArr
}
