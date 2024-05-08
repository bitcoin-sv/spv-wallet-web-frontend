import { FC } from 'react';
import styled from '@emotion/styled';
import { colors } from '@/styles';
import { StatusBadge } from './StatusBadge';
import { ContactNotConfirmed } from '@/api';

export const JustAddedContactMsg: FC = () => {
  return (
    <Container>
      <SuccessInfo>You've successfully accepted the contact.</SuccessInfo>
      Until confirmed, it will be displayed as{' '}
      <StatusBadge status={ContactNotConfirmed} style={{ display: 'inline' }} />
      <br />
      You can confirm it right now or return to this process later by using the "Show code" button.
    </Container>
  );
};

const Container = styled.div`
  padding: 20px;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
`;

const SuccessInfo = styled.div`
  color: ${colors.successScreen};
  font-size: 18px;
  padding-bottom: 10px;
`;
