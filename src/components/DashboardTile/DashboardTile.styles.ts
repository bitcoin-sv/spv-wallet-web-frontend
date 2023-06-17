import styled from '@emotion/styled'
import { colors, sizes } from '@/styles'
import { variables } from '@/styles/variables'

export const DashboardTileWrapper = styled.section`
  position: relative;
  display: block;
  width: 100%;
  padding: ${sizes(4)};
  border-radius: ${variables.borderRadius};
  background: ${colors.dashboardTileBackground};

  &:not(:last-of-type) {
    margin: 0 0 ${sizes(4)};
  }
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
