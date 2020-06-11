import React from 'react'
import { navigate } from 'gatsby'
import { useTranslation } from 'react-i18next'
import MaterialButton from 'components/Internal/MaterialButton'

export const LogOut = () => {
  const { t } = useTranslation()
  return (
    <p>
      <MaterialButton
        id='okta'
        onClick={() => {
          navigate('/user/logout')
        }}
        primary
        wide
      >
        {t('common:loginMenu.logout')}
      </MaterialButton>
    </p>
  )
}

export default LogOut
