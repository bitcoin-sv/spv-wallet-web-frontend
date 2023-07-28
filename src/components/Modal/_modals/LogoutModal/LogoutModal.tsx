import { Modal } from '@/components/Modal'
import { FC } from 'react'
import { ErrorBar } from '@/components/ErrorBar'
import { Loader } from '@/components/Loader'

interface LogoutModalProps {
  open: boolean
  secondaryButtonOnClickHandler?: () => void
  primaryButtonOnClickHandler?: () => void
  logoutError?: string
  loader?: boolean
}

export const LogoutModal: FC<LogoutModalProps> = ({
  open,
  primaryButtonOnClickHandler,
  secondaryButtonOnClickHandler,
  logoutError,
  loader,
}) => {
  return (
    <Modal
      open={open}
      modalTitle="Are you sure"
      modalSubtitle="you want to log out?"
      primaryButton={{ text: 'Cancel', variant: 'reject', onClick: primaryButtonOnClickHandler }}
      secondaryButton={{ text: 'Yes', variant: 'accept', onClick: secondaryButtonOnClickHandler }}
      onCloseByEsc={primaryButtonOnClickHandler}
    >
      {loader && <Loader />}
      {logoutError && <ErrorBar errorMsg={logoutError} withReloadButton />}
    </Modal>
  )
}
