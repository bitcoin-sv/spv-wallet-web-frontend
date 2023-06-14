import styled from '@emotion/styled'
import { sizes } from '@/styles/sizes'

export const Row = styled.div`
  display: flex;
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
`

interface ColumnProps {
  percentageWidth?: number
}

export const Column = styled.div<ColumnProps>`
  display: block;
  width: ${({ percentageWidth }) => (percentageWidth ? percentageWidth : 100)}%;
  padding-left: ${sizes(2)};
  padding-right: ${sizes(2)};
`
