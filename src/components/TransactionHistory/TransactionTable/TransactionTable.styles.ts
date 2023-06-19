import styled from '@emotion/styled'
import { colors, fontWeight, sizes } from '@/styles'
import { Button } from '@/components/Button'

interface TableWrapperProps {
  withPagination?: boolean
}

export const TableWrapper = styled.div<TableWrapperProps>`
  position: relative;
  width: 100%;
  min-height: 415px;
  flex-grow: 1;
  overflow-x: auto;
  margin-top: ${({ withPagination }) => (!withPagination ? 'unset' : sizes(8))};
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
  margin: 0 auto;
  text-align: center;
  vertical-align: top;

  tbody {
    vertical-align: top;
  }
  td {
    padding: ${sizes(2)} 0;
    border-bottom: 1px solid ${colors.lightPrimary};
  }
`

export const IdLink = styled(Button)`
  color: ${colors.tableLink};
`
