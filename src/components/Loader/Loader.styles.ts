import styled from '@emotion/styled'
import { PulseKeyframe } from '@/styles/keyframes'
import { colors } from '@/styles'
import { variables } from '@/styles/variables'

export const LoaderContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${colors.lightPrimary};
  border-radius: ${variables.borderRadius};
  z-index: 2;

  svg {
    &:nth-of-type(2) {
      animation-delay: 0.2s;
    }

    &:nth-of-type(3) {
      animation-delay: 0.4s;
    }
  }
`

export const SvgBullet = styled.svg`
  animation-name: ${PulseKeyframe};
  animation-duration: 1.2s;
  animation-iteration-count: infinite;
  transform-origin: 0 50%;

  circle {
    fill: ${colors.secondaryBackground};
  }
`
