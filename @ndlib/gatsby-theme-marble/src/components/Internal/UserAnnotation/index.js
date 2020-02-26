import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import queryString from 'query-string'
import CalloutBox from 'components/Shared/CalloutBox'
import Attribution from 'components/Internal/Attribution'
import Link from 'components/Internal/Link'
import UserCartouche from 'components/Internal/UserCartouche'
import { getData } from 'utils/api'

export const UserAnnotation = ({ location, loginReducer }) => {
  const [item, setItem] = useState(null)
  const [qs] = useState(queryString.parse(location.search) || {})
  const [userId] = useState(Object.keys(qs)[0])
  useEffect(() => {
    const abortController = new AbortController()
    getData({
      loginReducer: loginReducer,
      contentType: 'item',
      id: qs[userId],
      successFunc: (data) => {
        setItem(data)
      },
      errofFunc: () => {
        console.warn(`Query string item not found`)
      },
    })
    return () => {
      abortController.abort()
    }
  }, [loginReducer, qs, userId])

  if (item) {
    return (
      <CalloutBox>
        <Attribution>
          <UserCartouche user={{ uuid: `${userId}=` }} /> provided the annotation:</Attribution>
        <p>{item.annotation}</p>
        <Attribution>See <Link to={`/myportfolio/${item.collectionId}`}>portfolio</Link>.</Attribution>
      </CalloutBox>
    )
  }
  return null
}

UserAnnotation.propTypes = {
  location: PropTypes.object.isRequired,
  loginReducer: PropTypes.object.isRequired,
}
export const mapStateToProps = (state) => {
  return { ...state }
}

export default connect(
  mapStateToProps,
)(UserAnnotation)
