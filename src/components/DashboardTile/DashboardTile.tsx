import { DashboardTileWrapper, TileTitle, TitleIconWrapper } from './DashboardTile.styles'
import { FC, ReactNode } from 'react'
import { Column, Row } from '@/styles/grid'

interface TileProps {
  tileTitle: string
  paymail?: string
  titleIcon?: ReactNode
  children?: ReactNode
}

export const DashboardTile: FC<TileProps> = ({ tileTitle, paymail, titleIcon, children }) => {
  return (
    <DashboardTileWrapper>
      <Row>
        <Column>
          <header>
            <TileTitle>
              {tileTitle}
              {titleIcon && <TitleIconWrapper>{titleIcon}</TitleIconWrapper>}
            </TileTitle>
            {paymail && <p>{paymail}</p>}
          </header>
        </Column>
      </Row>

      <main>{children}</main>
    </DashboardTileWrapper>
  )
}
