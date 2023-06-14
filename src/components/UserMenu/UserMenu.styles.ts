import styled from '@emotion/styled'
import { Button } from '@/components/Button'
import { colors, sizes } from '@/styles'
import { variables } from '@/styles/variables'
import { keyframes } from '@emotion/react'

export const UserMenuWrapper = styled.div`
  position: relative;
  z-index: 1;
`
export const MenuButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background: transparent;
  box-shadow: none;

  &:hover,
  &:focus,
  &:focus-visible {
    box-shadow: none;

    & > span {
      transform: scale(1.1);
    }
  }
`

export const Avatar = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 48px;
  height: 48px;
  margin-left: ${sizes(6)};
  border-radius: 50%;
  background: ${colors.userMenuBackground};
  transition: ${variables.transition.baseEffect};
`

export const UserMenuFadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(115%);
  } 
  
  to {
    opacity: 1;
    transform: translateY(100%);
  }
`

export const MenuList = styled.ul`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  font-size: 18px;
  text-align: right;
  transform: translateY(100%);
  animation: ${UserMenuFadeIn} 0.3s ease-in-out both;
  z-index: 2;
`

export const MenuElement = styled.li`
  border-radius: ${variables.borderRadius};
  background: ${colors.userMenuBackground};
`
