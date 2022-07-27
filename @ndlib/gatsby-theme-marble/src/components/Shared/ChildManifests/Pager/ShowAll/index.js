/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import { jsx, Button } from 'theme-ui'
import PropTypes from 'prop-types'
import { navigate } from 'gatsby'
import { useLocation } from '@reach/router'

const ShowAll = ({
  defaultLength,
  items,
  pageNumber,
}) => {
  const location = useLocation()
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
        onClick={ () => navigate(`${location.pathname}?p=1`)}
      >Reset</Button>
      {
        pageNumber === 0
          ? null
          : (
            <Button
              onClick={ () => navigate(`${location.pathname}?p=0`)}
            >Load all items ({items.length})</Button>
          )
      }
    </div>
  )
}

ShowAll.propTypes = {
  items: PropTypes.array.isRequired,
  defaultLength: PropTypes.number.isRequired,
  pageNumber: PropTypes.number.isRequired,
}
export default ShowAll
