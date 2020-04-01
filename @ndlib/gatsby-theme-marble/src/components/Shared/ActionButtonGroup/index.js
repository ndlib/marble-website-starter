/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import PropTypes from 'prop-types'
import { jsx } from 'theme-ui'
import BookmarkGroup from './BookmarkGroup'
import ActionButton from './ActionButton'
import ManifestLink from './ManifestLink'
import print from 'assets/icons/svg/baseline-print-24px.svg'
import share from 'assets/icons/svg/baseline-share-24px.svg'
import downloadImg from 'assets/icons/svg/baseline-save_alt-24px.svg'

const ActionButtonGroup = ({ iiifManifest }) => {
  if (!iiifManifest) {
    return null
  }
  return (
    <section sx={{
      display: 'flex',
      width: '100%',
    }}>
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
