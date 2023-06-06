import styled from '@emotion/styled'
import { colors, sizes, srOnlyStyles } from '@/styles'
import { variables } from '@/styles/variables'

export const InputWrapper = styled.div`
  position: relative;
  display: block;
  margin: ${sizes(5)} 0;
  text-align: left;
`

type InputStyledProps = {
  error?: boolean
}

export const LabelStyled = styled.label`
  position: relative;
  display: inline-block;
  max-width: 100%;
  padding-left: ${sizes(8)};
  padding-top: ${sizes(1)};
  color: ${colors.textLightPrimary};
  font-size: 16px;
  cursor: pointer;
`

export const InputStyled = styled.input<InputStyledProps>`
  ${srOnlyStyles}

  & + label::before {
    content: '\\2714';
    display: block;
    position: absolute;
    top: ${sizes(0.5)};
    left: 0;
    width: 20px;
    height: 20px;
    line-height: 20px;
    text-align: center;
    font-size: 12px;
    color: transparent;
    cursor: pointer;
    border: 2px solid ${colors.textLightPrimary};
    border-radius: calc(${variables.borderRadius} / 2);
    transition: all 0.2s ease-in-out;
  }

  &:checked + label::before {
    border-color: ${colors.textLightPrimary};
    background: linear-gradient(
      90deg,
      rgba(253, 162, 92, 1) 0%,
      rgba(253, 162, 92, 1) 60%,
      rgba(255, 201, 111, 1) 100%
    );
    color: ${colors.textLightPrimary};
  }

  &:focus-visible {
    & + label {
      outline-offset: 3px;
      outline: 2px solid ${colors.textLightPrimary};
    }
  }
`
