import { FC, InputHTMLAttributes, useState } from 'react'

import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'

import { InputStyled, InputWrapper, LabelStyled, VisibilityToggler } from './Input.styles'

type inputProps = {
  labelText: string
  className?: string
  error?: boolean
  withIcon?: boolean
  customPlaceholder?: string
  togglePasswordVisibility?: boolean
  inputOnLightBackground?: boolean
} & InputHTMLAttributes<HTMLInputElement>

export const Input: FC<inputProps> = ({
  labelText,
  className,
  id,
  error,
  withIcon,
  customPlaceholder,
  togglePasswordVisibility,
  type,
  inputOnLightBackground,
  ...rest
}) => {
  const [inputType, setInputType] = useState(type)

  const handlePasswordVisibility = () => {
    if (inputType === 'password') {
      setInputType('text')
      return
    }
    setInputType('password')
  }

  return (
    <InputWrapper className={className}>
      <InputStyled
        {...rest}
        placeholder={customPlaceholder || labelText}
        type={inputType}
        id={id}
        error={error}
        withIcon={type === 'password' || withIcon}
        inputOnLightBackground={inputOnLightBackground || undefined}
      />
      <LabelStyled htmlFor={id} inputOnLightBackground={inputOnLightBackground || undefined}>
        {labelText}
      </LabelStyled>

      {togglePasswordVisibility && (
        <VisibilityToggler
          type="button"
          inputOnLightBackground={inputOnLightBackground || undefined}
          onClick={handlePasswordVisibility}
        >
          {inputType === 'text' ? <VisibilityOffIcon /> : <VisibilityIcon />}
        </VisibilityToggler>
      )}
    </InputWrapper>
  )
}
