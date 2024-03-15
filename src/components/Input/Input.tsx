import { FC } from 'react'

import { FormattedValueLabel, InputStyled, InputWrapper, LabelStyled } from './Input.styles'
import { InputProps } from './types'

export const Input: FC<InputProps> = ({
  labelText,
  className,
  id,
  error,
  withIcon,
  customPlaceholder,
  type,
  inputOnLightBackground,
  formattedValue,
  children,
  ...rest
}) => {
  return (
    <InputWrapper className={className}>
      <InputStyled
        {...rest}
        placeholder={customPlaceholder || labelText}
        type={type}
        id={id}
        error={error}
        withIcon={type === 'password' || withIcon}
        inputOnLightBackground={inputOnLightBackground || undefined}
      />
      <LabelStyled htmlFor={id} inputOnLightBackground={inputOnLightBackground || undefined}>
        {labelText}
      </LabelStyled>

      {children}

      {formattedValue && <FormattedValueLabel>BSV: {formattedValue}</FormattedValueLabel>}
    </InputWrapper>
  )
}
