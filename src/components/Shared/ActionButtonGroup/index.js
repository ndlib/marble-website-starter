import React from 'react'
import PropTypes from 'prop-types'
import ActionButton from './ActionButton'
import ManifestLink from 'components/Shared/ManifestLink'
import print from 'assets/icons/svg/baseline-print-24px.svg'
import share from 'assets/icons/svg/baseline-share-24px.svg'
import bookmark from 'assets/icons/svg/baseline-bookmark_border-24px.svg'
import bookmarkActive from 'assets/icons/svg/baseline-bookmark-24px.svg'
import downloadImg from 'assets/icons/svg/baseline-save_alt-24px.svg'

import style from './style.module.css'

const ActionButtonGroup = ({ iiifManifest }) => {
  return (
    <section className={style.actionButtons}>
      <ManifestLink manifestUrl={iiifManifest.id} />
      <ActionButton
        name='download'
        action={downloadAction}
        icon={downloadImg}
      />
      <ActionButton
        name='print'
        action={printAction}
        icon={print}
      />
      <ActionButton
        name='share'
        action={shareAction}
        icon={share}
      />
      <ActionButton
        name='bookmark'
        action={bookmarkAction}
        icon={bookmark}
        activeIcon={bookmarkActive}
        isActive
      />
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
  console.log('print')
}

export const downloadAction = () => {
  console.log('download')
}
export default ActionButtonGroup
