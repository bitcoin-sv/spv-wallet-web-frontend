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
  margin-top: ${({ withPagination }) => (!withPagination ? 'unset' : sizes(8))};
  padding-bottom: ${sizes(4)};
  overflow: hidden;

  ${media.sm} {
    overflow-x: auto;
  }
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
  vertical-align: middle;
  table-layout: fixed;

  ${media.sm} {
    table-layout: auto;
    text-align: center;
  }

  ${media.lg} {
    width: 750px;
    table-layout: fixed;
  }

  ${media.xl} {
    width: 920px;
  }

  th {
    font-size: 12px;
    text-align: left;

    ${media.sm} {
      text-align: center;
      font-size: 16px;
    }
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
  if (isConfirmed === true || isConfirmed === false) {
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

  ${media.md} {
    width: inherit;
  }

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
  width: 60%;

  ${media.md} {
    width: 270px;
  }

  ${media.xl} {
    width: 310px;
  }
`
export const LargeTd = styled.td`
  width: 60%;

  ${media.md} {
    width: 270px;
  }

  ${media.xl} {
    width: 310px;
  }
`

export const MediumTh = styled.th`
  width: 30%;

  ${media.md} {
    width: 170px;
  }

  ${media.xl} {
    width: 200px;
  }
`
export const MediumTd = styled.td`
  width: 30%;

  ${media.md} {
    width: 170px;
  }

  ${media.xl} {
    width: 200px;
  }
`

export const SmallTh = styled.th`
  width: 10%;

  ${media.md} {
    width: 70px;
  }

  ${media.xl} {
    width: 100px;
  }
`
export const SmallTd = styled.td`
  width: 10%;

  ${media.md} {
    width: 70px;
  }

  ${media.xl} {
    width: 100px;
  }
`

export const UserPrefix = styled.span`
  display: block;
  text-align: left;
  font-size: 12px;
`

export const IdLink = styled(Button)`
  display: block;
  text-align: left;
  width: 100%;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: ${colors.tableLink};

  ${media.md} {
    width: inherit;
  }
`

export const NoDataInfo = styled.p`
  text-align: center;
  margin: ${sizes(8)};
  font-size: 24px;
`
