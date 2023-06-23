import styled from '@emotion/styled'
import { colors, fontWeight, sizes } from '@/styles'
import { media } from '@/styles/media'

export const Screen = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: ${colors.successScreen};
  color: ${colors.lightPrimary};
  z-index: 3;

  svg {
    width: 128px;
    height: 128px;
  }
`

export const ScreenText = styled.p`
  margin-top: ${sizes(12)};
  font-size: 24px;
  font-weight: ${fontWeight.bold};

  ${media.sm} {
    font-size: 32px;
  }
`
