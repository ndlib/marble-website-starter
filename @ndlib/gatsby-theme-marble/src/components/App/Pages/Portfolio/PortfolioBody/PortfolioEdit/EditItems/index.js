import React from 'react'
import PropTypes from 'prop-types'
// import SortableList from 'components/App/FormElements/SortableList'
import DisplayViewToggle from 'components/Internal/DisplayViewToggle'
import { COMPILATIONS_LISTING_PAGE } from 'store/actions/displayActions'
import EditItem from './EditItem'
import NoItems from 'components/App/Pages/Portfolio/PortfolioBody/PortfolioView/PortfolioDisplay/NoItems'

const EditItems = ({ portfolio, className }) => {
  const { items } = portfolio
  return (
    <div className={className}>
      {
        // TODO add "Add Item" button

        items.length > 0 ? <DisplayViewToggle defaultDisplay={COMPILATIONS_LISTING_PAGE}>
          {
            items.map(item => {
              return (
                <EditItem
                  item={item}
                  key={item.uuid}
                />
              )
            })
          }
        </DisplayViewToggle> : <NoItems />
      }
    </div>
  )
}

EditItems.propTypes = {
  portfolio: PropTypes.object.isRequired,
  className: PropTypes.string,
}
export default EditItems
