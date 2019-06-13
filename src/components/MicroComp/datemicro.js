import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

const DateMicro = ({ meta, schema }) => {
  const formattedDate = moment(schema[meta.key]).format('YYYY-MM-DD')
  return (
    <React.Fragment>
      <dt className={meta.key}>{meta.label}:</dt>
      <dd className={meta.key}>{formattedDate}</dd>
    </React.Fragment>
  )
}

export default DateMicro

DateMicro.propTypes = {
  meta: PropTypes.object.isRequired,
  schema: PropTypes.object.isRequired,
}
