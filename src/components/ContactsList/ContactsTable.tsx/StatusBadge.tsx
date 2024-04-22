import {
  ContactAwaitingAcceptance,
  ContactConfirmed,
  ContactNotConfirmed,
  ContactStatus,
  ContactRejected,
} from '@/api/types/contact';
import { FC } from 'react';
import { Chip, ChipProps } from '@mui/material';
import styled from '@emotion/styled';

type StatusBadgeProps = {
  status: ContactStatus | 'unknown';
};

export const StatusBadge: FC<StatusBadgeProps & React.HTMLAttributes<HTMLDivElement>> = ({ status, ...props }) => {
  const { label, color } = contactStatuses[status] ?? { label: 'Unknown', color: 'error' };

  return (
    <ChipContainer {...props}>
      <Chip size="small" label={label} color={color} />
    </ChipContainer>
  );
};

const contactStatuses: Record<ContactStatus | 'unknown', { label: string; color: ChipProps['color'] }> = {
  [ContactAwaitingAcceptance]: { label: 'Pending', color: 'primary' },
  [ContactNotConfirmed]: { label: 'Untrusted', color: 'secondary' },
  [ContactConfirmed]: { label: 'Trusted', color: 'success' },
  [ContactRejected]: { label: 'Rejected', color: 'error' },
  unknown: { label: 'Unknown', color: 'warning' },
};

const ChipContainer = styled.div`
  & div span {
    line-height: 1;
    transform: translateY(1.5px);
  }
`;
