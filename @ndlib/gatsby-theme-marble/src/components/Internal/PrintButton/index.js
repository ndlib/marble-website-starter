import React from 'react'
import ActionButton from 'components/Shared/ActionButtonGroup/ActionButton'
import print from 'assets/icons/svg/baseline-print-24px.svg'

const PrintButton = () => {
  return (
    <ActionButton
      name='Print'
      action={printAction}
      icon={print}
    />
  )
}

export const printAction = () => {
  window.print()
}
export default PrintButton
