import styled from '@emotion/styled'
import { colors, sizes } from '@/styles'
import { variables } from '@/styles/variables'

export const ComponentTile = styled.div`
  display: block;
  width: 100%;
  padding: ${sizes(4)};
  margin: 0 0 ${sizes(4)};
  border-radius: ${variables.borderRadius};
  background: ${colors.userMenuBackground};
`
