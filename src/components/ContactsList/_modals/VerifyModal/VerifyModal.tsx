import { Modal } from '@/components/Modal'
import { FC } from 'react'
import { Loader } from '@/components/Loader'
import { Contact } from '@/api/types/contact'
import { useYourTOTP, YourTOTP } from './YourTOTP'
import { colors } from '@/styles'
import { PeerTOTP, usePeerTOTP } from './PeerTOTP'

type VerifyModalProps = {
  peer: Contact
  onRequestRefresh: () => void
  onClose: () => void
}

export const VerifyModal: FC<VerifyModalProps> = ({ peer, onRequestRefresh, onClose }) => {
  const yourTOTP = useYourTOTP()
  const peerTOTP = usePeerTOTP(onRequestRefresh)

  const loading = yourTOTP.loading || peerTOTP.confirming || peer.status == 'pending-invitation'

  return (
    <Modal
      open={true}
      modalTitle={`Verify ${peer.name}`}
      modalSubtitle={peer.paymail}
      primaryButton={{ text: 'Close', variant: 'reject', onClick: onClose }}
      secondaryButton={
        peer.status === 'untrusted'
          ? {
              text: 'Confirm the contact',
              variant: 'accept',
              onClick: peerTOTP.onConfirm,
              type: 'button',
              disabled: !peerTOTP.valid || peerTOTP.confirming,
            }
          : undefined
      }
      isLoading={loading}
      onCloseByEsc={onClose}
    >
      {loading && <Loader />}
      <div style={{ padding: 20 }}>
        <YourTOTP {...yourTOTP} peerName={peer.name} />
        <div style={{ marginTop: 30 }}>
          {peer.status === 'trusted' ? (
            <p style={{ color: colors.successScreen, fontSize: 24 }}>
              <b>{peer.name}</b> is your trusted contact.
            </p>
          ) : (
            <PeerTOTP {...peerTOTP} peerName={peer.name} />
          )}
        </div>
      </div>
    </Modal>
  )
}
