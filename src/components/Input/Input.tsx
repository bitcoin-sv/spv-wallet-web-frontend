import { forwardRef } from 'react'

import { InputStyled, InputWrapper, LabelStyled } from './Input.styles'
import { InputProps } from './types'

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ labelText, className, id, customPlaceholder, inputOnLightBackground, children, ...rest }, ref) => {
    return (
      <InputWrapper className={className}>
        <InputStyled
          {...rest}
          ref={ref}
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
)

Input.displayName = 'Input'
