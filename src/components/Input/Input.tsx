import { FC } from 'react'

import { InputStyled, InputWrapper, LabelStyled } from './Input.styles'
import { InputProps } from './types'

export const Input: FC<InputProps> = ({
  labelText,
  className,
  id,
  customPlaceholder,
  inputOnLightBackground,
  children,
  ...rest
}) => {
  return (
    <InputWrapper className={className}>
      <InputStyled
        {...rest}
        placeholder={customPlaceholder || labelText}
        inputOnLightBackground={inputOnLightBackground || undefined}
      />
      <LabelStyled htmlFor={id} inputOnLightBackground={inputOnLightBackground || undefined}>
        {labelText}
      </LabelStyled>

      {children}
    </InputWrapper>
  )
}
