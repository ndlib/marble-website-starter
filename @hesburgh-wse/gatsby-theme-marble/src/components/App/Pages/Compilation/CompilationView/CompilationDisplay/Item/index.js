import React from 'react'
import PropTypes from 'prop-types'
import MultiColumn from 'components/Shared/MultiColumn'
import Column from 'components/Shared/Column'
import Card from 'components/Shared/Card'
import UserCartouche from 'components/Internal/UserCartouche'
import ViewerButtons from './ViewerButtons'
import style from './style.module.css'

const Item = ({ item, user, annotated = false }) => {
  const finalTarget = targetWithAnnotation(item)
  const card = (
    <Card
      label={item.label}
      target={finalTarget}
      image={item.image}
    >
      {
        item.description
          ? <React.Fragment>
            <UserCartouche user={user} />
            <p>{item.description}</p>
          </React.Fragment> : null
      }
    </Card>
  )
  if (annotated) {
    return (
      <div className={style.item}>
        <MultiColumn columns='5'>
          <Column colSpan='3'>{item.description}</Column>
          <Column colSpan='2'>
            {card}
            <ViewerButtons iiifManifest={item.iiifManifest} />
          </Column>
        </MultiColumn>
      </div>
    )
  }
  return card
}

Item.propTypes = {
  item: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  annotated: PropTypes.bool,
}
export default Item

export const targetWithAnnotation = (item) => {
  if (item.description && !item.target.startsWith('http')) {
    return `${item.target}?a=${item.id}`
  }
  return item.target
}
