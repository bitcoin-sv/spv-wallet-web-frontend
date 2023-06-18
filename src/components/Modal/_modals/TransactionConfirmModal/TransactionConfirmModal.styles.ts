import styled from '@emotion/styled'
import { fontWeight, sizes } from '@/styles'

export const TextWithValues = styled.p`
  margin: ${sizes(8)} 0 ${sizes(4)};
  font-size: 22px;
`

export const Value = styled.span`
  font-weight: ${fontWeight.bold};
  color: #ff774e;
`
