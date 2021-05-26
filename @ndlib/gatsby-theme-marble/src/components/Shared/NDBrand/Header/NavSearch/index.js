/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { jsx, Box, Button, Input } from 'theme-ui'
import { navigate } from 'gatsby'
import queryString from 'query-string'

export const NDBrandNavSearch = ({ location, variant, searchPath, setShowSearch, ...props }) => {
  const inputRef = React.createRef()

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  })

  if (!searchPath.startsWith('/')) {
    searchPath = '/' + searchPath
  }

  const submitSearch = (location, inputRef, searchPath) => {
    const qs = queryString.parse(location.search)
    qs.q = `${inputRef.current.value}`
    navigate(`${searchPath}?${queryString.stringify(qs)}`)
  }
  return (
    <Box sx={{ variant: variant }} {...props}>
      <div>
        <Button title='Search' onClick={() => {
          submitSearch(location, inputRef, searchPath)
        }} sx={{
          borderRadius: '0',
          borderRightWidth: '1px',
          borderRightStyle: 'solid',
          borderRightColor: 'gray.4',
        }}>
          <svg className='icon' data-icon='search' width='16' height='16'>
            <use xlinkfref='#icon-search' />
            <svg id='icon-search' viewBox='0 0 512 512'>
              <path d='M508.5 468.9L387.1 347.5c-2.3-2.3-5.3-3.5-8.5-3.5h-13.2c31.5-36.5 50.6-84 50.6-136C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c52 0 99.5-19.1 136-50.6v13.2c0 3.2 1.3 6.2 3.5 8.5l121.4 121.4c4.7 4.7 12.3 4.7 17 0l22.6-22.6c4.7-4.7 4.7-12.3 0-17zM208 368c-88.4 0-160-71.6-160-160S119.6 48 208 48s160 71.6 160 160-71.6 160-160 160z' />
            </svg>
          </svg>
        </Button>
        <Input
          ref={inputRef}
          onKeyDown={(e) => {
            // Submit on enter key press
            if (e.keyCode === 13) {
              submitSearch(location, inputRef, searchPath)
            }
          }}
          sx={{ border: 0 }} placeholder='Search the collection' ariaLabel='Search' />
        {setShowSearch ? (
          <Button sx={{
            borderRadius: '0',
            borderLeftWidth: '1px',
            borderLeftStyle: 'solid',
            borderLeftColor: 'gray.4',
          }} onClick={() => {
            setShowSearch(false)
          }} title='close search'>
            <svg className='icon' data-icon='search' width='16' height='16'>
              <use xlinkFref='#icon-close' />
              <svg id='icon-close' viewBox='0 0 384 512'>
                <path d='M231.6 256l130.1-130.1c4.7-4.7 4.7-12.3 0-17l-22.6-22.6c-4.7-4.7-12.3-4.7-17 0L192 216.4 61.9 86.3c-4.7-4.7-12.3-4.7-17 0l-22.6 22.6c-4.7 4.7-4.7 12.3 0 17L152.4 256 22.3 386.1c-4.7 4.7-4.7 12.3 0 17l22.6 22.6c4.7 4.7 12.3 4.7 17 0L192 295.6l130.1 130.1c4.7 4.7 12.3 4.7 17 0l22.6-22.6c4.7-4.7 4.7-12.3 0-17L231.6 256z' />
              </svg>
            </svg>
          </Button>
        ) : null }
      </div>
    </Box>
  )
}

NDBrandNavSearch.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.string.isRequired,
  location: PropTypes.object.isRequired,
  searchPath: PropTypes.string.isRequired,
  setShowSearch: PropTypes.func,
  props: PropTypes.object,
}

NDBrandNavSearch.defaultProps = {
  variant: 'links.header',
}

export default NDBrandNavSearch
