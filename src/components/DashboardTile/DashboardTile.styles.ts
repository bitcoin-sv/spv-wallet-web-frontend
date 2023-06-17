import styled from '@emotion/styled'
import { colors, sizes } from '@/styles'
import { variables } from '@/styles/variables'

interface WrapperProps {
  fullHeight?: boolean
}

export const DashboardTileWrapper = styled.section<WrapperProps>`
  position: relative;
  display: block;
  width: 100%;
  height: ${({ fullHeight }) => (fullHeight ? '100%' : 'initial')};
  padding: ${sizes(4)};
  margin: 0 0 ${sizes(4)};
  border-radius: ${variables.borderRadius};
  background: ${colors.dashboardTileBackground};
`

export const TileTitle = styled.h3`
  position: relative;
  padding-right: ${sizes(12)};
  margin: 0 0 ${sizes(2)};
`

export const TitleIconWrapper = styled.span`
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);

  svg {
    font-size: 150%;
  }
`
