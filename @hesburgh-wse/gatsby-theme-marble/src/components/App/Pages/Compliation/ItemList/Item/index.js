import React from 'react'
import PropTypes from 'prop-types'
import MultiColumn from 'components/Shared/MultiColumn'
import Column from 'components/Shared/Column'
import Card from 'components/Shared/Card'
import ViewerButtons from './ViewerButtons'
import style from '../../style.module.css'

const Item = ({ item }) => {
  return (
    <div className={style.item}>
      <MultiColumn columns='5'>
        <Column colSpan='3'>{item.description}</Column>
        <Column colSpan='2'>
          <Card
            label={item.label}
            target={item.target}
            image={item.image}
          />
          <ViewerButtons iiifManifest={item.iiifManifest} />
        </Column>
      </MultiColumn>
    </div>
  )
}

Item.propTypes = {
  item: PropTypes.object.isRequired,
}
export default Item
