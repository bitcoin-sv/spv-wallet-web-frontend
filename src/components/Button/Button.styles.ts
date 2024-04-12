import isPropValid from '@emotion/is-prop-valid';
import styled from '@emotion/styled';
import { sizes } from '@/styles/sizes';
import { colors } from '@/styles/colors';
import { css } from '@emotion/react';
import { fontWeight } from '@/styles';
import { variables } from '@/styles/variables';
import { media } from '@/styles/media';

export type ButtonVariants = 'primary' | 'transparent' | 'accept' | 'reject';

interface ButtonProps {
  isLink?: boolean;
  fullWidth?: boolean;
  disabled?: boolean;
  secondary?: boolean;
  underline?: boolean;
  isTextLink?: boolean;
  isOnlyIconButton?: boolean;
  small?: boolean;
  variant: ButtonVariants;
}

export const getButtonColorVariant = ({ variant }: ButtonProps) => {
  if (variant === 'primary') {
    return css`
      background: ${variables.gradients.buttonPrimaryBackground};
    `;
  }
  if (variant === 'transparent') {
    return css`
      background: transparent;
      border: none;
    `;
  }
  if (variant === 'reject') {
    return css`
      background: linear-gradient(90deg, rgba(255, 141, 104, 1) 0%, rgba(255, 119, 84, 1) 100%);
    `;
  }
  if (variant === 'accept') {
    return css`
      background: linear-gradient(90deg, rgba(76, 228, 246, 1) 0%, rgba(42, 163, 219, 1) 100%);
    `;
  }
};

export const getDetailedStyles = ({ isLink, underline, isTextLink, isOnlyIconButton, small }: ButtonProps) => {
  if (isOnlyIconButton) {
    return css`
      padding: ${sizes(1)};
      background: transparent;
      color: inherit;
      border: none;
    `;
  }

  if (isLink) {
    if (isTextLink) {
      return css`
        padding: 0;
        font-size: inherit !important;
        text-decoration: underline;

        &:hover {
          text-decoration: none;
        }
      `;
    }

    if (underline) {
      return css`
        padding: ${sizes(2)};
        text-decoration: underline;

        &:hover {
          text-decoration: none;
        }
      `;
    }

    return css`
      padding: ${sizes(2)};
      background: transparent;

      &::after {
        content: '';
        display: block;
        position: absolute;
        bottom: -5px;
        left: ${sizes(2)};
        right: ${sizes(2)};
        height: 2px;
        background-color: ${colors.lightPrimary};
        opacity: 0;
        transition: ${variables.transition.underlineEffect};
        transform: translate3d(0, 0, 0);
      }

      &:hover {
        &::after {
          bottom: -2px;
          opacity: 1;
        }
      }

      &.active {
        &::after {
          bottom: -2px;
          opacity: 1;
        }
      }
    `;
  }

  return css`
    padding: ${sizes(3)};
    border-radius: ${variables.doubleBorderRadius};
    border: none;
    box-shadow: ${small ? variables.shadow.smallButtonShadow : variables.shadow.buttonShadow};
    outline: 2px solid transparent;
    outline-offset: 2px;
    transition: all 0.2s ease-in-out;
    font-weight: ${fontWeight.bold};

    ${media.sm} {
      padding: ${sizes(5)} ${sizes(4)};
    }

    &:hover,
    &:focus,
    &:focus-visible {
      box-shadow: ${small ? variables.shadow.smallButtonEffectShadow : variables.shadow.buttonEffectShadow};
    }

    &:focus-visible {
      outline-color: ${colors.lightPrimary};
    }
  `;
};

export const ButtonStyled = styled('button', { shouldForwardProp: isPropValid })<ButtonProps>`
  position: relative;
  display: inline-block;
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'unset')};
  color: ${colors.lightPrimary};
  text-decoration: none;
  font-size: ${({ small }) => (small ? '12px' : '16px')};
  line-height: 1;
  font-weight: ${fontWeight.regular};
  opacity: ${({ disabled }) => (disabled ? '0.4' : 'unset')};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};

  ${media.sm} {
    font-size: ${({ small }) => (small ? '14px' : '18px')};
  }

  ${getDetailedStyles}
  ${getButtonColorVariant}

  &:focus-visible {
    outline-color: ${colors.lightPrimary};
  }
`;
