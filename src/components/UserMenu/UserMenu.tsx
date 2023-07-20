import React, { FC, useState } from 'react'
import PersonIcon from '@mui/icons-material/Person'
import { Avatar, MenuButton, MenuElement, MenuList, UserMenuWrapper } from '@/components/UserMenu/UserMenu.styles'
import LogoutIcon from '@mui/icons-material/Logout'
import { LogoutModal } from '@/components/Modal'
import { useNavigate } from 'react-router-dom'
import { useAuthorization } from '@/providers'
import { logoutUser } from '@/api/requests/Logout'
import { useApiUrl } from '@/api/apiUrl'

interface MenuProps {
  userEmail?: string
}

export const UserMenu: FC<MenuProps> = ({ userEmail }) => {
  const [userMenu, setUserMenu] = useState<boolean>(false)
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [errors, setErrors] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const Navigate = useNavigate()
  const { setAuthorization } = useAuthorization()
  const apiUrl = useApiUrl()

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
    setErrors('')
  }

  const logoutHandler = () => {
    setLoading(true)
    logoutUser(apiUrl)
      .then(() => {
        closeModal()
        setAuthorization(null)
        Navigate('/')
      })
      .catch((error) => {
        const errorMsg = error.response.data ? error.response.data : 'Something went wrong... Please try again!'
        errorMsg && setErrors(errorMsg)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <UserMenuWrapper>
      <MenuButton variant="transparent" onClick={(event) => userMenuHandler(event)} isOpen={userMenu}>
        <span>{userEmail}</span>
        <Avatar>
          <PersonIcon />
        </Avatar>
      </MenuButton>
      {userMenu && (
        <MenuList>
          <MenuElement>
            <MenuButton variant="transparent" onClick={() => logoutModalHandler()}>
              Logout
              <LogoutIcon />
            </MenuButton>
          </MenuElement>
        </MenuList>
      )}
      <LogoutModal
        open={modalOpen}
        primaryButtonOnClickHandler={closeModal}
        secondaryButtonOnClickHandler={logoutHandler}
        logoutError={errors}
        loader={loading}
      />
    </UserMenuWrapper>
  )
}
