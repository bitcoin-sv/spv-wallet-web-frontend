import { Modal } from '@/components/Modal'
import { FC } from 'react'

interface ModalLogoutProps {
  open: boolean
  secondaryButtonOnClickHandler?: () => void
  primaryButtonOnClickHandler?: () => void
}

export const ModalLogout: FC<ModalLogoutProps> = ({
  open,
  primaryButtonOnClickHandler,
  secondaryButtonOnClickHandler,
}) => {
  return (
    <Modal
      open={open}
      modalTitle="Are you sure"
      modalSubtitle="you want to log out?"
      primaryButton={{ text: 'Cancel', variant: 'reject', onClick: primaryButtonOnClickHandler }}
      secondaryButton={{ text: 'Yes', variant: 'accept', onClick: secondaryButtonOnClickHandler }}
    />
  )
}
