/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import PropTypes from 'prop-types'
import EditItem from './EditItem'
import NoItems from 'components/App/Pages/Portfolio/PortfolioBody/PortfolioView/PortfolioDisplay/NoItems'
import { jsx } from 'theme-ui'

const EditItems = ({ portfolio, className }) => {
  const { items } = portfolio
  return (
    <div>
      {
        items.length > 0 ? (
          <div sx={{ margin: '0 -1rem' }}>
            {
              items.map(item => {
                return (
                  <div
                    key={item.uuid}
                    sx={{
                      display: 'inline-block',
                      padding: '1rem',
                      width: ['100%', '50%', '33.33%'],
                    }}
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
  className: PropTypes.string,
}
export default EditItems
