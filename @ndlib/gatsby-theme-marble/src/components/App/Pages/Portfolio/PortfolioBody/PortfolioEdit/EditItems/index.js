import React from 'react'
import PropTypes from 'prop-types'
import ResponsiveGridList from 'components/Internal/ResponsiveGridList'
import EditItem from './EditItem'
import NoItems from 'components/App/Pages/Portfolio/PortfolioBody/PortfolioView/PortfolioDisplay/NoItems'

const EditItems = ({ portfolio, className }) => {
  const { items } = portfolio
  return (
    <div className={`${className} grid`}>
      {
        // TODO add "Add Item" button

        items.length > 0 ? <ResponsiveGridList measureBeforeMount>
          {
            items.map(item => {
              return (
                <div
                  key={item.uuid}
                >
                  <EditItem
                    item={item}
                  />
                </div>
              )
            })
          }
        </ResponsiveGridList> : <NoItems />
      }
    </div>
  )
}

EditItems.propTypes = {
  portfolio: PropTypes.object.isRequired,
  className: PropTypes.string,
}
export default EditItems
