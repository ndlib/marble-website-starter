import React from 'react'

const Thumbnail = ({ src }) => {
  let t = (<span />)
  if (src && src['_id']) {
    t = (<img src={src['_id']} alt='the book open to a page' />)
  }
  return (t)
}

export default Thumbnail
