/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React, { useState, useContext } from 'react'
import { jsx } from 'theme-ui'
import PortfolioSettingsContent from './PortfolioSettingsContent'
import { PortfolioContext } from '../'
import MaterialButton from 'components/Internal/MaterialButton'
import ActionModal from 'components/Internal/ActionModal'

export const PortfolioEditSettings = () => {
  const { portfolio } = useContext(PortfolioContext)
  const [settingsOpen, setSettingsOpen] = useState(false)
  return (
    <React.Fragment>
      <MaterialButton
        primary
        wide
        onClick={() => setSettingsOpen(true)}
      >Edit Settings</MaterialButton>
      <ActionModal
        isOpen={settingsOpen}
        contentLabel={`Settings for <i>${portfolio.title}</i>`}
        closeFunc={() => setSettingsOpen(false)}
        fullscreen
      >
        <PortfolioSettingsContent
          callBack={() => {
            setSettingsOpen(false)
            // window.location.reload(true)
          }}
        />
      </ActionModal>
    </React.Fragment>
  )
}

export default PortfolioEditSettings
