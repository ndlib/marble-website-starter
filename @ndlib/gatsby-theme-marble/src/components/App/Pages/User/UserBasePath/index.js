import React from 'react'
import PropTypes from 'prop-types'
import Layout from 'components/Layout'
import Seo from 'components/Internal/Seo'
import UserBasePathContent from './UserBasePathContent'
import style from './style.module.css'

const UserBasePath = (props) => {
  const { location, loginReducer } = props

  return (
    <Layout
      location={location}
    >
      <Seo
        data={{}}
        location={location}
        title={`Login`}
        noIndex
      />
      <div className={style.contentBody}>
        <UserBasePathContent loginReducer={loginReducer} />
      </div>
    </Layout>
  )
}
UserBasePath.propTypes = {
  location: PropTypes.object.isRequired,
  loginReducer: PropTypes.object.isRequired,
}
export default UserBasePath
