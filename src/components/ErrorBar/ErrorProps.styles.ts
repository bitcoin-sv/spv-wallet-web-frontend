import styled from '@emotion/styled'
import { colors, sizes } from '@/styles'
import { variables } from '@/styles/variables'

export const BarWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  margin: 0 0 ${sizes(4)};
  padding: ${sizes(2)};
  font-size: 14px;
  border-radius: ${variables.borderRadius};
  background-color: ${colors.errorBackground};
`

export const ErrorText = styled.p`
  padding-top: ${sizes(1)};
  margin-left: ${sizes(2)};
  margin-bottom: 0;
  text-align: left;
  flex-grow: 1;
`
