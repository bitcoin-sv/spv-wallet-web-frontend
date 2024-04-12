import { ButtonHTMLAttributes, FC, PropsWithChildren } from 'react';

import { getLinkPropsFromTo } from '@/utils/buttons';

import { ButtonStyled, ButtonVariants } from './Button.styles';
import { To } from 'history';
import { CircularProgress } from '@mui/material';

export type ButtonProps = {
  isLink?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  secondary?: boolean;
  underline?: boolean;
  isTextLink?: boolean;
  isOnlyIconButton?: boolean;
  to?: To;
  newTab?: boolean;
  small?: boolean;
  variant: ButtonVariants;
  loading?: boolean;
} & PropsWithChildren &
  ButtonHTMLAttributes<HTMLButtonElement>;
export const Button: FC<ButtonProps> = ({
  children,
  isLink,
  disabled,
  fullWidth,
  secondary,
  underline,
  to,
  newTab,
  small,
  variant,
  loading,
  ...rest
}) => {
  return (
    <ButtonStyled
      {...rest}
      fullWidth={fullWidth}
      secondary={secondary}
      disabled={disabled}
      underline={underline}
      isLink={isLink}
      small={small}
      variant={variant}
      {...getLinkPropsFromTo(to, newTab)}
    >
      {loading ? <CircularProgress size={16} /> : children}
    </ButtonStyled>
  );
};
