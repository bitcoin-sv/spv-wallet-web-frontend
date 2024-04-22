import { Modal } from '@/components/Modal';
import { FC, PropsWithChildren } from 'react';
import { Contact, ContactAwaitingAcceptance, ContactConfirmed, ContactNotConfirmed } from '@/api/types/contact';
import { useYourTOTP, YourTOTP } from './YourTOTP';
import { colors } from '@/styles';
import { PeerTOTP, usePeerTOTP } from './PeerTOTP';
import styled from '@emotion/styled';

type VerifyModalProps = {
  peer: Contact;
  onConfirmed: () => void;
  onClose: () => void;
};

export const VerifyModal: FC<PropsWithChildren<VerifyModalProps>> = ({ children, peer, onConfirmed, onClose }) => {
  const { fullName, paymail, status } = peer;
  const yourTOTP = useYourTOTP(peer);
  const peerTOTP = usePeerTOTP(peer, onConfirmed);

  if (status == ContactAwaitingAcceptance) {
    return null;
  }

  return (
    <Modal
      open={true}
      modalTitle={`Verify ${fullName}`}
      modalSubtitle={paymail}
      primaryButton={{ text: 'Close', variant: 'reject', onClick: onClose }}
      secondaryButton={
        status === ContactNotConfirmed
          ? {
              text: 'Confirm the contact',
              variant: 'accept',
              onClick: peerTOTP.onConfirm,
              type: 'button',
              disabled: !peerTOTP.valid || peerTOTP.loading,
              loading: peerTOTP.loading,
            }
          : undefined
      }
      onCloseByEsc={onClose}
    >
      <Container>
        {children}
        <YourTOTP {...yourTOTP} peerName={fullName} />
        <Content>
          {status === ContactConfirmed ? (
            <TrustedContactMsg>
              <b>{fullName}</b> is your trusted contact.
            </TrustedContactMsg>
          ) : (
            <PeerTOTP {...peerTOTP} peerName={fullName} />
          )}
        </Content>
      </Container>
    </Modal>
  );
};

const Container = styled.div`
  padding: 20px;
  max-width: 80vw;
  width: 800px;
`;

const Content = styled.div`
  margin-top: 30px;
`;

const TrustedContactMsg = styled.div`
  color: ${colors.successScreen};
  font-size: 18px;
  padding-bottom: 10px;
`;
