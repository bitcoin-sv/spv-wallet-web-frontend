import { Modal } from '@/components/Modal'
import { FC } from 'react'
import { ErrorBar } from '@/components/ErrorBar'
import { Loader } from '@/components/Loader'

export type ConfirmationModalProps = {
  open: boolean
  onConfirm?: () => void
  onCancel?: () => void
  logoutError?: string
  loader?: boolean
  title?: string
  subtitle?: string
}

export const ConfirmationModal: FC<ConfirmationModalProps> = ({
  open,
  onConfirm,
  onCancel,
  logoutError,
  loader,
  title,
  subtitle,
}) => {
  return (
    <Modal
      open={open}
      modalTitle={title ?? 'Are you sure'}
      modalSubtitle={subtitle}
      primaryButton={{ text: 'Cancel', variant: 'reject', onClick: onCancel }}
      secondaryButton={{ text: 'Yes', variant: 'accept', onClick: onConfirm }}
      onCloseByEsc={onCancel}
    >
      {loader && <Loader />}
      {logoutError && <ErrorBar errorMsg={logoutError} withReloadButton />}
    </Modal>
  )
}
