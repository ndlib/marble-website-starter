import React from 'react'
import PropTypes from 'prop-types'
import Layout from 'components/Layout'
import Seo from 'components/Internal/Seo'
import { ownsPage } from 'utils/auth'
import MaterialButton from 'components/Internal/MaterialButton'
import CalloutBox from 'components/Internal/CalloutBox'
import Ownership from './Ownership'
import Item from './Item'
import style from '../style.module.css'

const ItemList = ({ location, compilation, loginReducer }) => {
  const { description, items, user } = compilation
  const isOwner = ownsPage(loginReducer, user.username)
  return (
    <Layout
      location={location}
      title={compilation.title}
    >
      <Seo
        title={compilation.title}
        location={location}
        data={{}}
        noIndex // ={compilation.visibility !== 'public'}
      />
      <Ownership compilation={compilation} loginReducer={loginReducer} />
      {
        isOwner
          ? <p style={{ textAlign: 'right' }}>
            <MaterialButton onClick={() => console.log('edit')}>Edit</MaterialButton>
          </p> : null
      }
      <div>
        <CalloutBox>
          <p>{description}</p>
        </CalloutBox>
      </div>
      <div className={style.itemGroup}>
        {
          items.map(item => {
            return <Item item={item} key={item.id} />
          })
        }
      </div>
    </Layout>
  )
}

ItemList.propTypes = {
  compilation: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  loginReducer: PropTypes.object.isRequired,
}

export default ItemList
