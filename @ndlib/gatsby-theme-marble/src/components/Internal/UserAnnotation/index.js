import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import queryString from 'query-string'
import CalloutBox from 'components/Shared/CalloutBox'
import Attribution from 'components/Internal/Attribution'
import Link from 'components/Internal/Link'
import UserCartouche from 'components/Internal/UserCartouche'

export const UserAnnotation = ({ location, loginReducer }) => {
  const [item, setItem] = useState(null)
  const [qs] = useState(queryString.parse(location.search) || {})
  const [userId] = useState(Object.keys(qs)[0])
  useEffect(() => {
    const abortController = new AbortController()
    const fetchData = async () => {
      if (loginReducer.userContentPath && userId) {
        fetch(`${loginReducer.userContentPath}item/${qs[userId]}`)
          .then(result => {
            return result.json()
          })
          .then(itemData => {
            setItem(itemData)
          })
          .catch(() => {
            console.warn(`Query string item not found`)
          })
      }
    }
    fetchData()
    return () => {
      abortController.abort()
    }
  }, [loginReducer.userContentPath, qs, userId])

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
