import React from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'
import { connect } from 'react-redux'
import { navigate } from 'gatsby'
import queryString from 'query-string'
import style from './style.module.css'

const options = [
  { value: 12, label: '12/page' },
  { value: 24, label: '24/page' },
  { value: 36, label: '36/page' },
  { value: 48, label: '48/page' },
  { value: 60, label: '60/page' },
]

export const PerPage = ({ searchReducer }) => {
  let { perpage } = searchReducer
  perpage = parseInt(perpage, 10) || 12
  return (
    <Select
      options={options}
      onChange={e => handleChange(e, window.location)}
      placeholder={perpage + '/page'}
      selectedValue={perpage}
      className={style.perpage}
    />
  )
}

PerPage.propTypes = {
  searchReducer: PropTypes.object.isRequired,
}

export const mapStateToProps = (state) => {
  return { ...state }
}

export const handleChange = (e, location) => {
  const qs = queryString.parse(location.search)
  qs.page = 1
  qs.perpage = e.value
  navigate(`/search?${queryString.stringify(qs)}`)
}

export default connect(mapStateToProps)(PerPage)
