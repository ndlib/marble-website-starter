import React from 'react'
import PropTypes from 'prop-types'
import BookmarkGroup from './BookmarkGroup'
import ActionButton from './ActionButton'
import ManifestLink from './ManifestLink'
import print from 'assets/icons/svg/baseline-print-24px.svg'
import share from 'assets/icons/svg/baseline-share-24px.svg'
// import bookmark from 'assets/icons/svg/baseline-bookmark_border-24px.svg'
// import bookmarkActive from 'assets/icons/svg/baseline-bookmark-24px.svg'
import downloadImg from 'assets/icons/svg/baseline-save_alt-24px.svg'

import style from './style.module.css'

const ActionButtonGroup = ({ iiifManifest }) => {
  if (!iiifManifest) {
    return null
  }
  return (
    <section className={style.actionButtons}>
      <BookmarkGroup iiifManifest={iiifManifest} />
      <ActionButton
        name='Share'
        action={shareAction}
        icon={share}
      />
      <ActionButton
        name='Print'
        action={printAction}
        icon={print}
      />
      <ActionButton
        name='Download'
        action={downloadAction}
        icon={downloadImg}
      />
      <ManifestLink manifestUrl={iiifManifest.id} />
    </section>
  )
}

ActionButtonGroup.propTypes = {
  iiifManifest: PropTypes.object.isRequired,
}
export const bookmarkAction = () => {
  console.log('bookmark')
}

export const shareAction = () => {
  console.log('share')
}

export const printAction = () => {
  window.print()
}

export const downloadAction = () => {
  console.log('download')
}
export default ActionButtonGroup
