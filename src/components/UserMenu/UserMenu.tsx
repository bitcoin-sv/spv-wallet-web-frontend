import React, { FC, useState } from 'react'
import PersonIcon from '@mui/icons-material/Person'
import { Avatar, MenuButton, MenuElement, MenuList, UserMenuWrapper } from '@/components/UserMenu/UserMenu.styles'
import LogoutIcon from '@mui/icons-material/Logout'

interface MenuProps {
  userEmail?: string
}

export const UserMenu: FC<MenuProps> = ({ userEmail }) => {
  const [userMenu, setUserMenu] = useState<boolean>(false)

  const userMenuHandler = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation()

    const currentTarget = event.currentTarget
    document.addEventListener('click', (event) => {
      if (event.target !== currentTarget) {
        setUserMenu(false)
      }
    })
    setUserMenu(!userMenu)
  }

  const logoutHandler = () => {
    alert('Are you sure?')
  }
  return (
    <UserMenuWrapper>
      <MenuButton onClick={(event) => userMenuHandler(event)}>
        <span>{userEmail}</span>
        <Avatar>
          <PersonIcon />
        </Avatar>
      </MenuButton>
      {userMenu && (
        <MenuList>
          <MenuElement>
            <MenuButton onClick={() => logoutHandler()}>
              Logout
              <LogoutIcon />
            </MenuButton>
          </MenuElement>
        </MenuList>
      )}
    </UserMenuWrapper>
  )
}
