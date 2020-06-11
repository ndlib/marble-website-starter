import React from 'react'
import PropTypes from 'prop-types'
import { navigate } from 'gatsby'
import { useTranslation } from 'react-i18next'
import MaterialButton from 'components/Internal/MaterialButton'
const EditUserButton = ({ userName }) => {
  const { t } = useTranslation()
  return (
    <MaterialButton
      onClick={() => navigate(`/user/${userName}/edit`)}
      wide
      primary
    >{t('common:button.userEdit')}
    </MaterialButton>
  )
}

EditUserButton.propTypes = {
  userName: PropTypes.string.isRequired,
}
export default EditUserButton
