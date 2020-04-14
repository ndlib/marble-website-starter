/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import PropTypes from 'prop-types'
import EditItem from './EditItem'
import NoItems from 'components/App/Pages/Portfolio/PortfolioBody/PortfolioView/PortfolioDisplay/NoItems'
import { jsx } from 'theme-ui'
import sx from './sx.js'

const EditItems = ({ portfolio }) => {
  const { items } = portfolio
  return (
    <div>
      {
        items.length > 0 ? (
          <div sx={sx.group}>
            {
              items.map(item => {
                return (
                  <div
                    key={item.uuid}
                    sx={sx.item}
                  >
                    <EditItem
                      item={item}
                    />
                  </div>
                )
              })
            }
          </div>
        ) : (
          <NoItems />
        )
      }
    </div>
  )
}

EditItems.propTypes = {
  portfolio: PropTypes.object.isRequired,
}
export default EditItems
