import React from 'react'
import PropTypes from 'prop-types'
import typy from 'typy'
import MultiColumn from 'components/Shared/MultiColumn'
import Column from 'components/Shared/Column'
import Card from 'components/Shared/Card'
import ViewerButtons from './ViewerButtons'
import style from './style.module.css'

const Item = ({ item, userId, annotated = false }) => {
  const finalTarget = targetWithAnnotation(item, userId)
  const card = (
    <Card
      label={item.title}
      target={finalTarget}
      image={item.image}
    >
      {
        item.annotation
          ? <React.Fragment>
            <p>{item.annotation}</p>
          </React.Fragment> : null
      }
    </Card>
  )
  if (annotated) {
    return (
      <div className={style.item}>
        <MultiColumn columns='5'>
          <Column colSpan='3'>{item.annotation}</Column>
          <Column colSpan='2'>
            {card}
            <ViewerButtons link={item.link} />
          </Column>
        </MultiColumn>
      </div>
    )
  }
  return card
}

Item.propTypes = {
  item: PropTypes.object.isRequired,
  userId: PropTypes.string.isRequired,
  annotated: PropTypes.bool,
}
export default Item

export const targetWithAnnotation = (item, userId) => {
  if (item && item.annotation && !typy(item, 'link').safeString.startsWith('http')) {
    return `${item.link}?${userId}${item.uuid}`
  }
  return item.link
}
