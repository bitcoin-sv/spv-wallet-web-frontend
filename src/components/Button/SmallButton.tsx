import { FC } from 'react'

import { Button, ButtonProps } from './Button'
import { sizes } from '@/styles'

const customStyles = {
  display: 'inline-flex',
  padding: sizes(1.5),
  marginLeft: sizes(2),
}

export const SmallButton: FC<ButtonProps> = (buttonProps) => {
  return (
    <Button {...buttonProps} style={customStyles} small>
      {buttonProps.children}
    </Button>
  )
}
