import styled from '@emotion/styled'
import { colors, fontWeight, sizes } from '@/styles'

export const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
  padding-bottom: ${sizes(4)};
`

export const CurrentPage = styled.p`
  margin: ${sizes(4)} 0 ${sizes(6)};
  font-size: 22px;
  text-align: right;
`

export const PageNumber = styled.span`
  font-weight: ${fontWeight.bold};
`

export const Table = styled.table`
  width: 940px;
  text-align: center;

  td {
    padding: ${sizes(2)} 0;
    border-bottom: 1px solid ${colors.lightPrimary};
  }
`
