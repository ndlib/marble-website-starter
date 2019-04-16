import React from 'react'

const Thumbnail = (src) => {
  let t = (<div />)
  if (src.src && src.src['_id']) {
    t = (<img src={src.src['_id']} alt='the book open to a page' />)
  }
  return (t)
}

export default Thumbnail
