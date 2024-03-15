import { Modal } from '@/components/Modal'
import { FC, useState } from 'react'
import { Loader } from '@/components/Loader'
import { useYourTOTP } from './useYourTOTP'
import { Contact } from '@/api/types/contact'
import { YourTOTP } from './YourTOTP'
import { colors } from '@/styles'

type VerifyModalProps = {
  contact: Contact
  onRequestRefresh: () => void
  onClose: () => void
}

export const VerifyModal: FC<VerifyModalProps> = ({ contact, onRequestRefresh, onClose }) => {
  if (contact.status === 'pending-invitation') {
    throw new Error('Contact is pending invitation')
  }
  const totp = useYourTOTP()
  const [confirming, setConfirming] = useState(false)

  const loading = totp.loading || confirming

  const onConfirm = () => {
    //TODO implement it
    setConfirming(true)
    setTimeout(() => {
      setConfirming(false)
      onRequestRefresh()
    }, 1000)
  }

  return (
    <Modal
      open={true}
      modalTitle={`Verify ${contact.name}`}
      modalSubtitle={contact.paymail}
      primaryButton={{ text: 'Close', variant: 'reject', onClick: onClose }}
      secondaryButton={
        contact.status === 'untrusted'
          ? {
              text: 'Confirm the contact',
              variant: 'accept',
              onClick: onConfirm,
              type: 'button',
            }
          : undefined
      }
      isLoading={loading}
      onCloseByEsc={onClose}
    >
      {loading && <Loader />}
      <div style={{ padding: 20 }}>
        <YourTOTP {...totp} contactName={contact.name} />
        <div style={{ marginTop: 30 }}>
          {contact.status === 'trusted' && (
            <p style={{ color: colors.successScreen, fontSize: 24 }}>
              <b>{contact.name}</b> is your trusted contact.
            </p>
          )}
        </div>
      </div>
    </Modal>
  )
}
