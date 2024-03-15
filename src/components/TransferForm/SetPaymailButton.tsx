import { FC } from 'react'

import { Button } from '@/components/Button'
import SendIcon from '@mui/icons-material/Send'
import { emitSetPaymailEvent } from './setPaymailEvent'
import { sizes } from '@/styles'
import { ButtonVariants } from '../Button/Button.styles'

type SetPaymailButtonProps = {
  paymail: string
  variant?: ButtonVariants
  onClick?: () => void
}

const customStyles = {
  display: 'inline-flex',
  padding: sizes(2),
  marginLeft: sizes(2),
}

export const SetPaymailButton: FC<SetPaymailButtonProps> = ({ paymail, variant, onClick }) => {
  return (
    <Button
      variant={variant ?? 'accept'}
      style={customStyles}
      small
      onClick={() => {
        emitSetPaymailEvent(paymail)
        onClick?.()
      }}
    >
      <SendIcon fontSize="small" />
    </Button>
  )
}
