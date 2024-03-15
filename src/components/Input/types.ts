import { InputHTMLAttributes } from 'react'

export type InputProps = {
  labelText: string
  className?: string
  error?: boolean
  withIcon?: boolean
  customPlaceholder?: string
  inputOnLightBackground?: boolean
} & InputHTMLAttributes<HTMLInputElement>

export type PasswordInputProps = Omit<InputProps, 'type' | 'withIcon'>

export type CoinsInputProps = Omit<InputProps, 'type' | 'step' | 'min'>
