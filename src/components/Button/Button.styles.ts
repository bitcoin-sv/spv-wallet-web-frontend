import isPropValid from '@emotion/is-prop-valid'
import styled from '@emotion/styled'
import { sizes } from '@/styles/sizes'
import { colors } from '@/styles/colors'
import { css } from '@emotion/react'
import { fontWeight } from '@/styles'

type ButtonProps = {
  isLink?: boolean
  fullWidth?: boolean
  disabled?: boolean
  secondary?: boolean
  small?: boolean
}

export const getDetailedStyles = ({ isLink }: ButtonProps) => {
  if (isLink) {
    return css`
      padding: ${sizes(2)} ${sizes(2)};
      background: transparent;

      &::after {
        content: '';
        display: block;
        position: absolute;
        bottom: -7px;
        left: 0;
        right: 0;
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
    padding: ${sizes(3)} ${sizes(4)};
    border-radius: 8px;
    background: ${colors.primary};
  `
}

export const ButtonStyled = styled('button', { shouldForwardProp: isPropValid })<ButtonProps>`
  position: relative;
  display: inline-block;
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'unset')};
  color: ${colors.textLightPrimary};
  text-decoration: none;
  font-size: ${({ small }) => (small ? '14px' : '16px')};
  line-height: 1;
  font-weight: ${fontWeight.regular};
  opacity: ${({ disabled }) => (disabled ? '0.4' : 'unset')};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};

  ${getDetailedStyles}
`
