/** @jsx jsx */
import { jsx } from 'theme-ui'
import PropTypes from 'prop-types'
import typy from 'typy'
import Item from './Item'
import NoItems from './NoItems'
import DisplayViewToggle from 'components/Internal/DisplayViewToggle'
import { COMPILATION_PAGE } from 'store/actions/displayActions'
import { usePortfolioContext } from 'context/PortfolioContext'

const PortfolioItems = ({ isOwner }) => {
  const { portfolio } = usePortfolioContext()
  const { items, layout, userId } = portfolio
  if (typy(portfolio, 'items').safeArray.length === 0) {
    return (
      <NoItems />
    )
  }

  const sortedItems = items.sort((i1, i2) => {
    return i1.created - i2.created
  })
  if (layout === 'annotated') {
    return (
      <div className='grid'>
        {
          sortedItems.map(item => {
            return (
              <Item
                item={item}
                annotated
                key={item.uuid}
                userId={userId}
                isOwner={isOwner}
              />
            )
          })
        }
      </div>
    )
  }
  return (
    <DisplayViewToggle defaultDisplay={COMPILATION_PAGE}>
      {
        sortedItems.map(item => {
          return (
            <Item
              item={item}
              key={item.uuid}
              userId={userId}
              isOwner={isOwner}
            />
          )
        })
      }
    </DisplayViewToggle>
  )
}

PortfolioItems.propTypes = {
  isOwner: PropTypes.bool,
}
export default PortfolioItems
