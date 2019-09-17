import React from 'react'
import PropTypes from 'prop-types'
import { Styled } from 'theme-ui'
import Layout from 'components/Layout'
import Seo from 'components/Internal/Seo'
import MultiColumn from 'components/Shared/MultiColumn'
import Column from 'components/Shared/Column'
import Gravatar from 'components/Internal/Gravatar'
import FollowButton from './FollowButton'
import EditUserButton from './EditUserButton'
import { isLoggedIn, ownsPage } from 'utils/auth'
import style from './style.module.css'
const UserLayout = ({ user, children, location, loginReducer }) => {
  const isOwner = ownsPage(loginReducer, user.username)
  return (
    <Layout
      location={location}
    >
      <Seo
        data={{}}
        location={location}
        title={user.username}
        noIndex
      />
      <MultiColumn columns='5'>
        <Column>
          <div className={style.identityGroup}>
            <Gravatar email={user.email} />
            <div className={style.identity}>
              <Styled.h1>{user.name}</Styled.h1>
              <Styled.h2>{user.username}</Styled.h2>
            </div>
          </div>
          <div>
            {
            /* Follow or Edit button */
              isOwner ? <EditUserButton username={user.username} /> : <FollowButton username={user.username} showButton={isLoggedIn(loginReducer)} />
            }
          </div>
          <div className={style.bio}>{user.bio}</div>
        </Column>
        <Column colSpan='4'>
          {children}
        </Column>
      </MultiColumn>
    </Layout>

  )
}

UserLayout.propTypes = {
  user: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
  location: PropTypes.object.isRequired,
  loginReducer: PropTypes.object.isRequired,
}
export default UserLayout
