import { forwardRef } from 'react';

import { Input } from './Input';
import { PaymailInputProps } from './types';
import { usePaymailDomain } from '@/hooks/usePaymailDomain';
import { InputLinkButton } from './Input.styles';
import ContactsIcon from '@mui/icons-material/Contacts';

export const PaymailInput = forwardRef<HTMLInputElement, PaymailInputProps>(
  ({ showContactsButton, labelSuffix = '', ...props }, ref) => {
    const paymailDomain = usePaymailDomain();

    return (
      <Input ref={ref} {...props} type="text" labelText={`Paymail (example@${paymailDomain})${labelSuffix}`}>
        {showContactsButton && (
          <InputLinkButton to="/contacts">
            <ContactsIcon />
          </InputLinkButton>
        )}
      </Input>
    );
  },
);

PaymailInput.displayName = 'PaymailInput';
