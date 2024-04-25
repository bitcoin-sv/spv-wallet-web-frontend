import { HTMLAttributes, InputHTMLAttributes } from 'react';

export type InputProps = {
  labelText: string;
  className?: string;
  error?: boolean;
  withIcon?: boolean;
  customPlaceholder?: string;
  inputOnLightBackground?: boolean;
  rootProps?: HTMLAttributes<HTMLDivElement>;
} & InputHTMLAttributes<HTMLInputElement>;

export type PasswordInputProps = Omit<InputProps, 'type' | 'withIcon'>;

export type CoinsInputProps = Omit<InputProps, 'type' | 'step' | 'min'>;

export type PaymailInputProps = {
  showContactsButton?: boolean;
  labelSuffix?: string;
  rootProps?: HTMLAttributes<HTMLDivElement>;
} & Omit<InputProps, 'type' | 'labelText'>;

export type PaymailAutocompleteProps = {
  paymailValue?: string;
  onPaymailChange: (value: string) => void;
} & Omit<PaymailInputProps, 'rootProps'>;
