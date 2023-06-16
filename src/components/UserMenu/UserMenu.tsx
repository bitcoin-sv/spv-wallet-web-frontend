import React, { FC, useState } from 'react'
import PersonIcon from '@mui/icons-material/Person'
import { Avatar, MenuButton, MenuElement, MenuList, UserMenuWrapper } from '@/components/UserMenu/UserMenu.styles'
import LogoutIcon from '@mui/icons-material/Logout'
import { ModalLogout } from '@/components/Modal'
import { useNavigate } from 'react-router-dom'
import { useAuthorization } from '@/providers'

interface MenuProps {
  userEmail?: string
}

export const UserMenu: FC<MenuProps> = ({ userEmail }) => {
  const [userMenu, setUserMenu] = useState<boolean>(false)
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const Navigate = useNavigate()
  const { setAuthorization } = useAuthorization()

  const userMenuHandler = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation()

    const currentTarget = event.currentTarget
    document.addEventListener(
      'click',
      (event) => {
        if (event.target !== currentTarget) {
          setUserMenu(false)
        }
      },
      { once: true }
    )

    setUserMenu(!userMenu)
  }

  const logoutModalHandler = () => {
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
  }

  const logoutHandler = () => {
    console.log('user logged out')
    closeModal()
    setAuthorization(null)
    Navigate('/')
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
            <MenuButton onClick={() => logoutModalHandler()}>
              Logout
              <LogoutIcon />
            </MenuButton>
          </MenuElement>
        </MenuList>
      )}
      <ModalLogout
        open={modalOpen}
        primaryButtonOnClickHandler={closeModal}
        secondaryButtonOnClickHandler={logoutHandler}
      />
    </UserMenuWrapper>
  )
}
