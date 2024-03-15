import { Modal } from '@/components/Modal'
import { FC, PropsWithChildren } from 'react'
import { Contact, ContactAwaitingAcceptance, ContactConfirmed, ContactNotConfirmed } from '@/api/types/contact'
import { useYourTOTP, YourTOTP } from './YourTOTP'
import { colors } from '@/styles'
import { PeerTOTP, usePeerTOTP } from './PeerTOTP'

type VerifyModalProps = {
  peer: Contact
  onConfirmed: () => void
  onClose: () => void
}

export const VerifyModal: FC<PropsWithChildren<VerifyModalProps>> = ({ children, peer, onConfirmed, onClose }) => {
  const yourTOTP = useYourTOTP(peer.paymail)
  const peerTOTP = usePeerTOTP(peer.paymail, onConfirmed)

  if (peer.status == ContactAwaitingAcceptance) {
    return null
  }

  return (
    <Modal
      open={true}
      modalTitle={`Verify ${peer.name}`}
      modalSubtitle={peer.paymail}
      primaryButton={{ text: 'Close', variant: 'reject', onClick: onClose }}
      secondaryButton={
        peer.status === ContactNotConfirmed
          ? {
              text: 'Confirm the contact',
              variant: 'accept',
              onClick: peerTOTP.onConfirm,
              type: 'button',
              disabled: !peerTOTP.valid || peerTOTP.confirming,
              loading: peerTOTP.confirming,
            }
          : undefined
      }
      onCloseByEsc={onClose}
    >
      <div style={{ padding: 20, maxWidth: '80vw', width: 800 }}>
        {children}
        <YourTOTP {...yourTOTP} peerName={peer.name} />
        <div style={{ marginTop: 30 }}>
          {peer.status === ContactConfirmed ? (
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
