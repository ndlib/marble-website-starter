import React from 'react'
import PropTypes from 'prop-types'

import Seo from 'components/Shared/Seo'
import UserBasePathContent from './UserBasePathContent'
import style from './style.module.css'

const UserBasePath = ({ location }) => {
  return (
    <React.Fragment>
      <Seo
        data={{}}
        location={location}
        title={`Login`}
        noIndex
      />
      <div className={style.contentBody}>
        <UserBasePathContent />
      </div>
    </React.Fragment>
  )
}
UserBasePath.propTypes = {
  location: PropTypes.object.isRequired,
}

export default UserBasePath
