import { NavList } from '@/components/Navigation/Navigation.styes'
import { FC, ReactNode } from 'react'
interface NavigationProps {
  children: ReactNode
}
export const Navigation: FC<NavigationProps> = ({ children }) => {
  return (
    <nav>
      <NavList>{children}</NavList>
    </nav>
  )
}
