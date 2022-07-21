/** @jsx jsx */
import React from 'react'
import { jsx, Button } from 'theme-ui'
import PropTypes from 'prop-types'

const ShowAll = ({
  updateItems,
  defaultLength = 30,
  items = [],
}) => {
  // No pager if there is one subpage or no subpages
  if (defaultLength >= items.length) {
    return null
  }

  return (
    <div sx={{
      textAlign: 'center',
      '& button': { margin: '0.5rem' },
    }}>
      <Button
        onClick={ () => updateItems(0, defaultLength)}
      >Reset</Button>
      <Button
        onClick={ () => updateItems(0, items.length)}
      >Load all items ({items.length})</Button>
    </div>
  )
}

ShowAll.propTypes = {
  items: PropTypes.array,
  updateItems: PropTypes.func.isRequired,
  defaultLength: PropTypes.number,
}
export default ShowAll
