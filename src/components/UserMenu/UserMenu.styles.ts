import styled from '@emotion/styled'
import { Button } from '@/components/Button'
import { colors, sizes, UserMenuFadeIn } from '@/styles'
import { variables } from '@/styles/variables'
import { media } from '@/styles/media'

export const UserMenuWrapper = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
  margin-left: auto;

  ${media.sm} {
    width: auto;
  }
`

interface MenuButtonProps {
  isOpen?: boolean
}

export const MenuButton = styled(Button)<MenuButtonProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background: transparent;
  box-shadow: none;
  margin-bottom: ${({ isOpen }) => (isOpen ? sizes(12) : 'initial')};

  &:not(li > Button) {
    padding-left: 0;
    justify-content: flex-end;
    flex-direction: row-reverse;
    text-decoration: underline;

    ${media.sm} {
      flex-direction: row;
      justify-content: space-between;
      padding-left: initial;
    }
  }

  &:hover,
  &:focus,
  &:focus-visible {
    box-shadow: none;
    text-decoration: none;

    & > div {
      transform: scale(1.1);
    }
  }
`

export const Avatar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 0 0 48px;
  width: 48px;
  height: 48px;
  margin-right: ${sizes(6)};
  border-radius: 50%;
  background: ${colors.userMenuBackground};
  transition: ${variables.transition.baseEffect};

  ${media.sm} {
    margin-right: 0;
    margin-left: ${sizes(6)};
  }
`

export const MenuList = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  width: 120px;
  transform: translateY(-100%);
  font-size: 18px;
  text-align: right;
  z-index: 3;
  animation: ${UserMenuFadeIn} 0.3s 0.3s ease-in-out both;

  ${media.sm} {
    left: unset;
    right: ${sizes(4)};
    transform: translateY(-90%);
    width: 200px;
  }
`

export const MenuElement = styled.li`
  border-radius: ${variables.borderRadius};
  background: ${colors.userMenuBackground};
`
