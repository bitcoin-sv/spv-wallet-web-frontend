import { Modal } from '@/components/Modal'
import { FC, PropsWithChildren } from 'react'
import { Contact, ContactAwaitingAcceptance, ContactConfirmed, ContactNotConfirmed } from '@/api/types/contact'
import { useYourTOTP, YourTOTP } from './YourTOTP'
import { colors } from '@/styles'
import { PeerTOTP, usePeerTOTP } from './PeerTOTP'
import styled from '@emotion/styled'

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
      <Container>
        {children}
        <YourTOTP {...yourTOTP} peerName={peer.name} />
        <Content>
          {peer.status === ContactConfirmed ? (
            <TrustedContactMsg>
              <b>{peer.name}</b> is your trusted contact.
            </TrustedContactMsg>
          ) : (
            <PeerTOTP {...peerTOTP} peerName={peer.name} />
          )}
        </Content>
      </Container>
    </Modal>
  )
}

const Container = styled.div`
  padding: 20px;
  max-width: 80vw;
  width: 800px;
`

const Content = styled.div`
  margin-top: 30px;
`

const TrustedContactMsg = styled.div`
  color: ${colors.successScreen};
  font-size: 18px;
  padding-bottom: 10px;
`
