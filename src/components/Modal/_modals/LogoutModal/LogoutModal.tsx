import { Modal } from '@/components/Modal'
import { FC } from 'react'

interface LogoutModalProps {
  open: boolean
  secondaryButtonOnClickHandler?: () => void
  primaryButtonOnClickHandler?: () => void
}

export const LogoutModal: FC<LogoutModalProps> = ({
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
