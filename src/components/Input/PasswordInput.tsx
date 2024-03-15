import { FC, useState } from 'react'

import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'

import { InputButton } from './Input.styles'
import { Input } from './Input'
import { PasswordInputProps } from './types'

export const PasswordInput: FC<PasswordInputProps> = (props) => {
  const [showPassword, setShowPassword] = useState(false)
  const type = showPassword ? 'text' : 'password'

  return (
    <Input {...props} type={type} withIcon>
      <InputButton
        type="button"
        inputOnLightBackground={props.inputOnLightBackground || undefined}
        onClick={() => setShowPassword((prev) => !prev)}
      >
        {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
      </InputButton>
    </Input>
  )
}
