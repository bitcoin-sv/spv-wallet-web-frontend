import styled from '@emotion/styled'
import { colors, fontWeight, sizes } from '@/styles'
import { Button } from '@/components/Button'
import { media } from '@/styles/media'
import { css } from '@emotion/react'

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
  width: 100%;
  margin: 0 auto;
  text-align: center;
  vertical-align: middle;

  ${media.md} {
    width: 750px;
    table-layout: fixed;
  }

  ${media.xl} {
    width: 920px;
  }

  th {
    font-size: 12px;
  }

  tbody {
    vertical-align: top;
  }

  td {
    position: relative;
    padding: ${sizes(2)} ${sizes(1)};
    border-bottom: 1px solid ${colors.lightPrimary};
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: middle;

    ${media.md} {
      padding: ${sizes(2)} 0;
    }

    &:hover {
      span::after {
        opacity: 1;
      }
    }
  }
`

interface ContentWithInfoTip {
  isConfirmed?: boolean
  uppercase?: boolean
}

const getContentForBefore = ({ isConfirmed }: ContentWithInfoTip) => {
  if (isConfirmed) {
    return css`
      content: '';
    `
  }

  return css`
    content: none;
  `
}

export const ContentWithInfoTip = styled.span<ContentWithInfoTip>`
  position: relative;
  display: block;
  width: inherit;

  &:after {
    content: attr(data-value);
    display: block;
    padding: 2px 4px;
    position: absolute;
    top: -8px;
    left: 0;
    font-size: 12px;
    background: #ff7754;
    transform: translateY(-100%);
    text-transform: ${({ uppercase }) => (uppercase ? 'uppercase' : 'initial')};
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.2s ease-in-out;

    ${media.md} {
      font-size: 14px;
    }
  }

  &::before {
    ${getContentForBefore};
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -5px);
    display: block;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: ${({ isConfirmed }) => (isConfirmed ? colors.transactionConfirmed : colors.transactionUnconfirmed)};
    pointer-events: none;
  }
`

export const LargeTh = styled.th`
  ${media.md} {
    width: 270px;
  }

  ${media.xl} {
    width: 310px;
  }
`
export const LargeTd = styled.td`
  ${media.md} {
    width: 270px;
  }

  ${media.xl} {
    width: 310px;
  }
`

export const MediumTh = styled.th`
  ${media.md} {
    width: 170px;
  }

  ${media.xl} {
    width: 200px;
  }
`
export const MediumTd = styled.td`
  ${media.md} {
    width: 170px;
  }

  ${media.xl} {
    width: 200px;
  }
`

export const SmallTh = styled.th`
  ${media.md} {
    width: 70px;
  }

  ${media.xl} {
    width: 100px;
  }
`
export const SmallTd = styled.td`
  ${media.md} {
    width: 70px;
  }

  ${media.xl} {
    width: 100px;
  }
`

export const IdLink = styled(Button)`
  display: block;
  width: inherit;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: ${colors.tableLink};
`

export const NoDataInfo = styled.p`
  text-align: center;
  margin: ${sizes(8)};
  font-size: 24px;
`
