/** @jsx jsx */
import { useState } from 'react'
import { jsx } from 'theme-ui'
import PropTypes from 'prop-types'
import typy from 'typy'
import MaterialButton from 'components/Internal/MaterialButton'
import NoItems from './NoItems'
import AnnotatedView from './AnnotatedView'
import GridListView from './GridListView'
import EditList from './EditList'
import { usePortfolioContext } from 'context/PortfolioContext'
import sx from './sx'

// eslint-disable-next-line complexity
const PortfolioItems = ({ isOwner }) => {
  const { portfolio } = usePortfolioContext()
  const [editing, setEditing] = useState(false)
  const { items, layout, userId } = portfolio
  if (typy(portfolio, 'items').safeArray.length === 0) {
    return (
      <NoItems />
    )
  }
  const sortedItems = items.sort((i1, i2) => {
    return i1.displayOrder - i2.displayOrder
  })
  let list
  if (isOwner && editing) {
    list = (
      <EditList
        items={sortedItems}
        closeFunc={setEditing}
      />
    )
  } else if (layout === 'annotated') {
    list = (
      <AnnotatedView
        items={sortedItems}
        isOwner={isOwner}
        userId={userId}
      />
    )
  } else {
    list = (
      <GridListView
        items={sortedItems}
        isOwner={isOwner}
        userId={userId}
      />
    )
  }

  return (
    <div>
      <div sx={sx.reorderButton}>
        {
          editing ? null : (
            <MaterialButton
              wide
              onClick={() => {
                setEditing(!editing)
              }}
            >Sort Items
            </MaterialButton>
          )
        }
      </div>
      {list}
    </div>
  )
}

PortfolioItems.propTypes = {
  isOwner: PropTypes.bool,
}
export default PortfolioItems
