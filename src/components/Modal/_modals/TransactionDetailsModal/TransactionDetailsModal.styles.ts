import styled from '@emotion/styled'
import { Button } from '@/components/Button'
import { colors, sizes } from '@/styles'
import { media } from '@/styles/media'

export const DetailsList = styled.ul`
  width: 100%;
  margin-top: ${sizes(4)};
  font-size: 12px;
  text-align: left;
  word-break: break-word;

  ${media.sm} {
    margin-top: ${sizes(8)};
    font-size: 14px;
  }
`

export const ListElement = styled.li`
  padding: ${sizes(2)} 0;
`

export const DataName = styled.strong`
  display: block;
`

export const DetailsLink = styled(Button)`
  color: ${colors.textHighlighted};
`

type HighlightedProps = {
  enabled: boolean
}

export const Highlighted = styled.span<HighlightedProps>`
  font-weight: ${({ enabled }) => (enabled ? 'bold' : 'normal')};
  font-size: ${({ enabled }) => (enabled ? '22px' : 'inherit')};
`
