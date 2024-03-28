import { Modal } from '@/components/Modal'
import { FC } from 'react'
import { ErrorBar } from '@/components/ErrorBar'

export type ConfirmationModalProps = {
  open: boolean
  onConfirm?: () => void
  onCancel?: () => void
  error?: string
  loading?: boolean
  title?: string
  subtitle?: string
}

export const ConfirmationModal: FC<ConfirmationModalProps> = ({
  open,
  onConfirm,
  onCancel,
  error,
  loading,
  title,
  subtitle,
}) => {
  return (
    <Modal
      open={open}
      modalTitle={title ?? 'Are you sure'}
      modalSubtitle={subtitle}
      primaryButton={{ text: 'Cancel', variant: 'reject', onClick: onCancel }}
      secondaryButton={{ text: 'Yes', variant: 'accept', onClick: onConfirm, loading: loading, disabled: loading }}
      onCloseByEsc={onCancel}
    >
      {error && <ErrorBar errorMsg={error} withReloadButton />}
    </Modal>
  )
}
