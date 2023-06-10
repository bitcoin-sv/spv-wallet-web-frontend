import styled from '@emotion/styled'
import { media } from '@/styles/media'
import { colors, sizes } from '@/styles'
import { variables } from '@/styles/variables'

export const InputWrapper = styled.div`
  position: relative;
  display: block;
  margin: ${sizes(6)} 0;
`

export const LabelStyled = styled.label`
  position: absolute;
  top: ${sizes(3)};
  left: ${sizes(5)};
  margin: 0;
  font-size: 14px;
  line-height: 1.4;
  color: ${colors.lightPrimary};
  transition: all 0.2s ease;

  ${media.sm} {
    top: ${sizes(5)};
    font-size: 16px;
    line-height: 1.1;
  }

  &:hover {
    cursor: text;
  }
`

type InputStyledProps = {
  error?: boolean
  withIcon?: boolean
}

export const InputStyled = styled.input<InputStyledProps>`
  width: 100%;
  height: 42px;
  padding: ${({ withIcon }) =>
    withIcon ? `${sizes(2)} ${sizes(12)} ${sizes(2)} ${sizes(5)}` : `${sizes(2)} ${sizes(5)} ${sizes(2)}`};
  border: 2px solid ${colors.lightPrimary};
  border-radius: ${variables.doubleBorderRadius};
  background-color: ${colors.inputBackground};
  color: ${colors.lightPrimary};

  ${media.sm} {
    height: 54px;
  }

  &::placeholder {
    color: transparent;
  }

  &:focus,
  &:focus-visible,
  &:not(:placeholder-shown),
  &:-webkit-autofill {
    outline: transparent;
    border-color: ${colors.inputEffectBorder};
    box-shadow: ${variables.shadow.inputEffectShadow};

    &::placeholder {
      color: transparent;
    }

    & + label {
      top: -${sizes(4)};
      font-size: 12px;
      color: ${colors.lightPrimary};
    }
  }
`

export const VisibilityToggler = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: ${sizes(3)};
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  padding: 0;
  border: 2px solid transparent;
  outline-color: transparent;
  background: transparent;
  cursor: pointer;
  color: inherit;

  &:focus-visible {
    outline-color: transparent;
    border-color: ${colors.lightPrimary};
  }
`
