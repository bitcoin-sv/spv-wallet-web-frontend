import styled from '@emotion/styled'
import { sizes } from '@/styles/sizes'
import { media } from '@/styles/media'

interface GridProps {
  smallReverse?: boolean
  fullHeight?: boolean
}

export const Row = styled.div<GridProps>`
  display: flex;
  flex-wrap: wrap;
  flex-direction: ${({ smallReverse }) => (smallReverse ? 'column-reverse' : 'initial')};
  width: 100%;
  height: ${({ fullHeight }) => (fullHeight ? '100%' : 'initial')};
  max-width: 1440px;
  margin: 0 auto;

  ${media.lg} {
    flex-direction: row;
  }
`

interface ColumnProps {
  percentageWidth?: number
  fullHeight?: boolean
}

export const Column = styled.div<ColumnProps>`
  display: block;
  width: ${({ percentageWidth }) => (percentageWidth ? percentageWidth : 100)}%;
  height: ${({ fullHeight }) => (fullHeight ? '100%' : 'initial')};
  padding-left: ${sizes(2)};
  padding-right: ${sizes(2)};
`
