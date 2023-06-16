import styled from '@emotion/styled'
import { colors, fontWeight, sizes } from '@/styles'

interface ValueProps {
  mainValue?: boolean
}
export const BalanceValue = styled.p<ValueProps>`
  margin: 0 0 ${sizes(2)};
  font-weight: ${({ mainValue }) => (mainValue ? fontWeight.bold : fontWeight.regular)};
  font-size: ${({ mainValue }) => (mainValue ? '28px' : '18px')};
  color: ${({ mainValue }) => (mainValue ? colors.balanceMainValue : colors.balanceValue)};
  letter-spacing: 1px;
`

export const Currency = styled.span`
  font-size: 70%;
  margin-left: ${sizes(2)};
`
