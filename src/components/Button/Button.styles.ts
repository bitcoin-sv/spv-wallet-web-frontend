import isPropValid from '@emotion/is-prop-valid'
import styled from '@emotion/styled'
import { sizes } from '@/styles/sizes'
import { colors } from '@/styles/colors'
import { css } from '@emotion/react'
import { fontWeight } from '@/styles'
import { variables } from '@/styles/variables'
import { media } from '@/styles/media'

interface ButtonProps {
  isLink?: boolean
  fullWidth?: boolean
  disabled?: boolean
  secondary?: boolean
  underline?: boolean
  isTextLink?: boolean
  isOnlyIconButton?: boolean
  small?: boolean
}

export const getDetailedStyles = ({ isLink, underline, isTextLink, isOnlyIconButton }: ButtonProps) => {
  if (isOnlyIconButton) {
    return css`
      padding: ${sizes(1)};
      background: transparent;
      color: inherit;
      border: none;
    `
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
      `
    }

    if (underline) {
      return css`
        padding: ${sizes(2)};
        text-decoration: underline;

        &:hover {
          text-decoration: none;
        }
      `
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
    `
  }

  return css`
    padding: ${sizes(3)};
    border-radius: ${variables.doubleBorderRadius};
    background: ${variables.gradients.buttonPrimaryBackground};
    border: 2px solid transparent;
    box-shadow: ${variables.shadow.buttonShadow};
    outline: transparent;
    transition: all 0.2s ease-in-out;
    font-weight: ${fontWeight.bold};

    ${media.sm} {
      padding: ${sizes(5)} ${sizes(4)};
    }

    &:hover,
    &:focus,
    &:focus-visible {
      box-shadow: ${variables.shadow.buttonEffectShadow};
    }
  `
}

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

  &:focus-visible {
    outline-color: transparent;
    border-color: ${colors.lightPrimary};
  }
`
