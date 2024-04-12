import { FC } from 'react';

import { SmallButton } from '@/components/Button';
import SendIcon from '@mui/icons-material/Send';
import { emitSetPaymailEvent } from './setPaymailEvent';
import { ButtonVariants } from '../Button/Button.styles';

type SetPaymailButtonProps = {
  paymail: string;
  variant?: ButtonVariants;
  onClick?: () => void;
};

export const SetPaymailButton: FC<SetPaymailButtonProps> = ({ paymail, variant, onClick }) => {
  return (
    <SmallButton
      variant={variant ?? 'accept'}
      onClick={() => {
        emitSetPaymailEvent(paymail);
        onClick?.();
      }}
    >
      <SendIcon fontSize="inherit" />
    </SmallButton>
  );
};
