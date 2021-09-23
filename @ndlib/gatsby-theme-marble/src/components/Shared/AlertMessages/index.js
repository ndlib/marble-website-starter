/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import PropTypes from 'prop-types'
import { jsx, Alert, Button } from 'theme-ui'
import { useAlertContext } from '@ndlib/gatsby-theme-marble/src/context/AlertContext'
import { FaWindowClose } from 'react-icons/fa'

const AlertMessages = () => {
  const { alerts, removeAlert } = useAlertContext()
  return (
    <div sx={{
      position: 'fixed',
      bottom: '5rem',
      left: '10rem',
      transition: 'width 2s',
    }}>
      {
        Object.entries(alerts).map(([key, value]) => {
          return (
            <Alert variant={value.type} key={key}>
              {value.msg}
              <Button
                variant='primary'
                onClick={() => removeAlert(key)}>
                <FaWindowClose />
              </Button>
            </Alert>
          )
        })
      }
    </div>
  )
}

AlertMessages.propTypes = {

}

export default AlertMessages
