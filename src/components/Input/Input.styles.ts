import styled from '@emotion/styled'
import { media } from '@/styles/media'
import { colors, sizes } from '@/styles'
import { variables } from '@/styles/variables'

export const InputWrapper = styled.div`
  position: relative;
  display: block;
  margin: ${sizes(3)} 0;

  ${media.md} {
    margin: ${sizes(6)} 0;
  }
`

export const LabelStyled = styled.label`
  position: absolute;
  top: ${sizes(4.5)};
  left: ${sizes(5)};
  margin: 0;
  line-height: 1;
  color: ${colors.textLightPrimary};
  transition: all 0.2s ease;

  ${media.md} {
    top: ${sizes(5)};
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
  height: 48px;
  padding: ${({ withIcon }) =>
    withIcon ? `${sizes(2)} ${sizes(12)} ${sizes(2)} ${sizes(5)}` : `${sizes(2)} ${sizes(5)} ${sizes(2)}`};
  border: 2px solid #fff;
  border-radius: ${variables.doubleBorderRadius};
  background-color: ${colors.inputBackground};
  color: ${colors.textLightPrimary};

  ${media.md} {
    height: 54px;
  }

  &::placeholder {
    color: transparent;
  }

  &:focus,
  &:focus-visible,
  &:not(:placeholder-shown) {
    outline: transparent;
    border-color: rgba(255, 201, 111, 1);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);

    &::placeholder {
      color: transparent;
    }

    & + label {
      top: -${sizes(4)};
      font-size: 12px;
      color: ${colors.textLightPrimary};
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
    border-color: ${colors.textLightPrimary};
  }
`
