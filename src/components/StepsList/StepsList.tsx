import { StepsListStyles } from './StepsList.styles'
import { FC, ReactNode } from 'react'

type ListProps = {
  children: ReactNode
}
export const StepsList: FC<ListProps> = ({ children }) => {
  return <StepsListStyles>{children}</StepsListStyles>
}
