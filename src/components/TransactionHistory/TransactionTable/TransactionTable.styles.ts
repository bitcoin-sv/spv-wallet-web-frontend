import styled from '@emotion/styled'
import { colors, fontWeight, sizes } from '@/styles'
import { media } from '@/styles/media'
import { css } from '@emotion/react'
import { variables } from '@/styles/variables'

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

type TableProps = {
  clickable?: boolean
}

export const Table = styled.table<TableProps>`
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

  tbody tr {
    cursor: ${({ clickable }) => (clickable ? 'pointer' : 'default')};
    transition: all 0.2s ease-in-out;

    &:hover {
      padding: 0 1rem;
      background-color: ${colors.trHoverEffect};

      span {
        text-decoration: none;
      }
    }

    &:focus-visible {
      outline: 2px solid ${colors.lightPrimary};
      outline-offset: 2px;
      border-radius: calc(${variables.borderRadius} / 2);
    }

    td:first-of-type {
      padding-left: ${sizes(1)};
    }
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
        ${media.lg} {
          opacity: 1;
        }
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
    width: 100%;
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
  width: 55%;

  ${media.md} {
    width: 270px;
  }

  ${media.xl} {
    width: 310px;
  }
`
export const LargeTd = styled.td`
  width: 55%;

  ${media.md} {
    width: 270px;
  }

  ${media.xl} {
    width: 310px;
  }
`

export const MediumTh = styled.th`
  width: 45%;

  ${media.md} {
    width: 170px;
  }

  ${media.xl} {
    width: 200px;
  }
`
export const MediumTd = styled.td`
  width: 45%;

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

export const Highlighted = styled('span')`
  display: block;
  text-align: left;
  width: 100%;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-decoration: underline;
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
