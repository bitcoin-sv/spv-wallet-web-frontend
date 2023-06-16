import { DashboardTileWrapper, TileTitle, TitleIconWrapper } from './DashboardTile.styles'
import { FC, ReactNode } from 'react'

interface TileProps {
  tileTitle: string
  paymail?: string
  titleIcon?: ReactNode
  children?: ReactNode
}

export const DashboardTile: FC<TileProps> = ({ tileTitle, paymail, titleIcon, children }) => {
  return (
    <DashboardTileWrapper>
      <header>
        <TileTitle>
          {tileTitle}
          {titleIcon && <TitleIconWrapper>{titleIcon}</TitleIconWrapper>}
        </TileTitle>
        {paymail && <p>{paymail}</p>}
      </header>
      <main>{children}</main>
    </DashboardTileWrapper>
  )
}
