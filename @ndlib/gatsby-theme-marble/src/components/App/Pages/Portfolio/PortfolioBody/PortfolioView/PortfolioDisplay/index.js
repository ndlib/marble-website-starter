/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import PropTypes from 'prop-types'
import { jsx } from 'theme-ui'
import Item from './Item'
import NoItems from './NoItems'
import DisplayViewToggle from 'components/Internal/DisplayViewToggle'
import ShareButton from 'components/Internal/ShareButton'
import PrintButton from 'components/Internal/PrintButton'
import { COMPILATION_PAGE } from 'store/actions/displayActions'
const PortfolioDisplay = ({ portfolio }) => {
  const { items, layout, userId, uuid } = portfolio
  if (items.length === 0) {
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
              />
            )
          })
        }
      </div>
    )
  }
  return (
    <DisplayViewToggle
      defaultDisplay={COMPILATION_PAGE}
      extraControls={
        () => {
          return (
            <div
              sx={{
                display: 'inline-flex',
                float: 'left',
                margin: '0 !important',
              }}
            >
              <ShareButton path={`myportfolio/${uuid}`} />
              <PrintButton />
            </div>
          )
        }
      }
    >
      {
        sortedItems.map(item => {
          return (
            <Item
              item={item}
              key={item.uuid}
              userId={userId}
            />
          )
        })
      }
    </DisplayViewToggle>
  )
}

PortfolioDisplay.propTypes = {
  portfolio: PropTypes.shape({
    items: PropTypes.array.isRequired,
    layout: PropTypes.oneOf([
      'default',
      'annotated',
    ]),
    userId: PropTypes.string.isRequired,
    uuid: PropTypes.string.isRequired,
  }),

}
export default PortfolioDisplay
