import { ButtonHTMLAttributes, FC, PropsWithChildren } from 'react'

import { getLinkPropsFromTo } from '@/utils/buttons'

import { ButtonStyled } from './Button.styles'
import { To } from 'history'

type ButtonProps = {
  isLink?: boolean
  disabled?: boolean
  fullWidth?: boolean
  secondary?: boolean
  to?: To
  newTab?: boolean
  small?: boolean
} & PropsWithChildren &
  ButtonHTMLAttributes<HTMLButtonElement>
export const Button: FC<ButtonProps> = ({
  children,
  isLink,
  disabled,
  fullWidth,
  secondary,
  to,
  newTab,
  small,
  ...rest
}) => {
  return (
    <ButtonStyled
      {...rest}
      fullWidth={fullWidth}
      secondary={secondary}
      disabled={disabled}
      isLink={isLink}
      small={small}
      {...getLinkPropsFromTo(to, newTab)}
    >
      {children}
    </ButtonStyled>
  )
}
