import {
  ContactAwaitingAcceptance,
  ContactConfirmed,
  ContactNotConfirmed,
  ContactStatus,
  ContactRejected,
} from '@/api/types/contact';
import { FC } from 'react';
import { Chip, ChipProps } from '@mui/material';

type StatusBadgeProps = {
  status: ContactStatus;
};

export const StatusBadge: FC<StatusBadgeProps> = ({ status }) => {
  const { label, color } = contactStatuses[status] ?? { label: 'Unknown', color: 'error' };

  return <Chip size="small" label={label} color={color} />;
};

const contactStatuses: Record<ContactStatus, { label: string; color: ChipProps['color'] }> = {
  [ContactAwaitingAcceptance]: { label: 'Pending', color: 'primary' },
  [ContactNotConfirmed]: { label: 'Untrusted', color: 'secondary' },
  [ContactConfirmed]: { label: 'Trusted', color: 'success' },
  [ContactRejected]: { label: 'Rejected', color: 'error' },
};
