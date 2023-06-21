import styled from '@emotion/styled'
import { Button } from '@/components/Button'
import { sizes } from '@/styles'

export const DetailsList = styled.ul`
  margin-top: ${sizes(8)};
  font-size: 18px;
  text-align: left;
`

export const ListElement = styled.li`
  padding: ${sizes(2)} 0;
`

export const DataName = styled.strong`
  display: block;
`

export const DetailsLink = styled(Button)`
  color: #ff774e;
`
