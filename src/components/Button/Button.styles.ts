import isPropValid from '@emotion/is-prop-valid'
import styled from '@emotion/styled'
import { sizes } from '@/styles/sizes'
import { colors } from '@/styles/colors'
import { css } from '@emotion/react'
import { fontWeight } from '@/styles'
import { variables } from '@/styles/variables'
import { media } from '@/styles/media'

type ButtonProps = {
  isLink?: boolean
  fullWidth?: boolean
  disabled?: boolean
  secondary?: boolean
  underline?: boolean
  isTextLink?: boolean
  small?: boolean
}

export const getDetailedStyles = ({ isLink, underline, isTextLink }: ButtonProps) => {
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
        background-color: ${colors.textLightPrimary};
        opacity: 0;
        transition: 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
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
    padding: ${sizes(5)} ${sizes(4)};
    border-radius: ${variables.doubleBorderRadius};
    background: linear-gradient(
      90deg,
      rgba(253, 162, 92, 1) 0%,
      rgba(253, 162, 92, 1) 60%,
      rgba(255, 201, 111, 1) 100%
    );
    border: 2px solid transparent;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    outline: transparent;
    transition: all 0.2s ease-in-out;
    font-weight: ${fontWeight.bold};

    &:hover,
    &:focus,
    &:focus-visible {
      box-shadow: 0 5px 35px rgba(0, 0, 0, 0.3);
    }
  `
}

export const ButtonStyled = styled('button', { shouldForwardProp: isPropValid })<ButtonProps>`
  position: relative;
  display: inline-block;
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'unset')};
  color: ${colors.textLightPrimary};
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
    border-color: ${colors.textLightPrimary};
  }
`
