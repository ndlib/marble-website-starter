import React from 'react'
import PropTypes from 'prop-types'
import typy from 'typy'
import { Styled } from 'theme-ui'
import Layout from 'components/Layout'
import Seo from 'components/Internal/Seo'
import MultiColumn from 'components/Shared/MultiColumn'
import Column from 'components/Shared/Column'
import Gravatar from './Gravatar'
import FollowButton from './FollowButton'
import EditUserButton from './EditUserButton'
import { isLoggedIn } from 'utils/auth'
import style from './style.module.css'
const UserLayout = ({ username, children, location, loginReducer }) => {
  const ownsPage = isLoggedIn(loginReducer) && typy(loginReducer, 'user.username').safeString === username

  return (
    <Layout
      location={location}
    >
      <Seo
        data={{}}
        location={location}
        title={username}
        noIndex
      />
      <MultiColumn columns='5'>
        <Column>
          <div className={style.identityGroup}>
            <Gravatar email='rfox2@nd.edu' size={400} />
            <div className={style.identity}>
              <Styled.h1>Name</Styled.h1>
              <Styled.h2>{username}</Styled.h2>
            </div>
          </div>
          <div>
            {
            /* Follow or Edit button */
              ownsPage ? <EditUserButton username={username} /> : <FollowButton username={username} showButton={isLoggedIn(loginReducer)} />
            }
          </div>
          <div className={style.bio}>Some kind of description goes here. Professors can put their class list here maybe, or you could say what kind of things you're interested in. There will be a character limit and it will be editable on the edit page.</div>
        </Column>
        <Column colSpan='4'>
          {children}
        </Column>
      </MultiColumn>
    </Layout>

  )
}

UserLayout.propTypes = {
  username: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  location: PropTypes.object.isRequired,
  loginReducer: PropTypes.object.isRequired,
}
export default UserLayout
