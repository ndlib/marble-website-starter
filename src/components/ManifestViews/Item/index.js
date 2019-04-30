import React from 'react'
import PropTypes from 'prop-types'
import Layout from 'components/Layout'
import ItemAside from './ItemAside'
import ItemPreMain from './ItemPreMain'
import MetaDataList from 'components/Shared/MetaDataList'
import style from './style.module.css'

export const Item = ({ iiifManifest, location }) => {
  console.log(location.state)
  return (
    <Layout
      preMain={<ItemPreMain iiifManifest={iiifManifest} location={location} />}
      title={iiifManifest.label}
      aside={<ItemAside iiifManifest={iiifManifest} />}
      asideClassName={style.itemAside}
      articleClassName={style.itemMain}
    >
      <p>{iiifManifest.description}</p>
      <MetaDataList metadata={iiifManifest.metadata} />
      <p>{iiifManifest.attribution}</p>
      <p>{iiifManifest.license}</p>
    </Layout>
  )
}
Item.propTypes = {
  iiifManifest: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
}

export default Item
