import { FC } from 'react'

import { Input } from './Input'
import { PaymailInputProps } from './types'
import { usePaymailDomain } from '@/hooks/usePaymailDomain'
import { InputLinkButton } from './Input.styles'
import ContactsIcon from '@mui/icons-material/Contacts'

export const PaymailInput: FC<PaymailInputProps> = ({ showContactsButton, ...props }) => {
  const paymailDomain = usePaymailDomain()

  return (
    <Input {...props} type="text" labelText={`Paymail (example@${paymailDomain})`}>
      {showContactsButton && (
        <InputLinkButton to="/contacts" inputOnLightBackground={props.inputOnLightBackground || undefined}>
          <ContactsIcon />
        </InputLinkButton>
      )}
    </Input>
  )
}
