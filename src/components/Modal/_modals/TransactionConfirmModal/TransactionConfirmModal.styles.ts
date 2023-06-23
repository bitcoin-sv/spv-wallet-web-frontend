import styled from '@emotion/styled'
import { fontWeight, sizes } from '@/styles'
import { media } from '@/styles/media'

export const TextWithValues = styled.p`
  margin: ${sizes(8)} 0 ${sizes(4)};
  font-size: 22px;
`

export const Value = styled.span`
  font-weight: ${fontWeight.bold};
  color: #ff774e;
`
export const Form = styled.form`
  margin: 0 auto;

  ${media.sm} {
    width: 70%;
  }
`
