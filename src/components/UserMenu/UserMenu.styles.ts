import styled from '@emotion/styled'
import { Button } from '@/components/Button'
import { colors, sizes, UserMenuFadeIn } from '@/styles'
import { variables } from '@/styles/variables'
import { media } from '@/styles/media'

export const UserMenuWrapper = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;

  ${media.sm} {
    width: auto;
  }
`
export const MenuButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background: transparent;
  box-shadow: none;

  &:not(li > Button) {
    max-width: 50%;
    padding-left: 0;
    justify-content: flex-end;
    flex-direction: row-reverse;
    text-decoration: underline;

    ${media.sm} {
      max-width: none;
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
  top: 50%;
  right: 0;
  width: 120px;
  transform: translateY(-50%);
  font-size: 18px;
  text-align: right;
  z-index: 3;

  ${media.sm} {
    bottom: 0;
    left: 0;
    transform: translateY(100%);
    width: 100%;
    animation: ${UserMenuFadeIn} 0.3s ease-in-out both;
  }
`

export const MenuElement = styled.li`
  border-radius: ${variables.borderRadius};
  background: ${colors.userMenuBackground};
`
