import React, { FC, useState } from 'react';
import { Avatar, MenuButton, MenuElement, MenuList, UserMenuWrapper } from '@/components/UserMenu/UserMenu.styles';
import LogoutIcon from '@mui/icons-material/Logout';
import { LogoutModal } from '@/components/Modal';
import { useNavigate } from 'react-router-dom';
import { useAuthorization } from '@/providers';
import { logoutUser } from '@/api/requests';
import { BsvLogo } from '@/components/BsvLogo';
import { errorMessage } from '@/utils/errorMessage';

interface MenuProps {
  userEmail?: string;
}

export const UserMenu: FC<MenuProps> = ({ userEmail }) => {
  const [userMenu, setUserMenu] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [errors, setErrors] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const Navigate = useNavigate();
  const { setAuthorization } = useAuthorization();

  const userMenuHandler = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();

    const currentTarget = event.currentTarget;
    document.addEventListener(
      'click',
      (event) => {
        if (event.target !== currentTarget) {
          setUserMenu(false);
        }
      },
      { once: true },
    );

    setUserMenu(!userMenu);
  };

  const logoutModalHandler = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setErrors('');
  };

  const logoutHandler = () => {
    setLoading(true);
    logoutUser()
      .then(() => {
        closeModal();
        setAuthorization(null);
        Navigate('/');
      })
      .catch((error) => {
        setErrors(errorMessage(error.response.data));
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <UserMenuWrapper>
      <MenuButton variant="transparent" onClick={(event) => userMenuHandler(event)} isOpen={userMenu}>
        <span>{userEmail}</span>
        <Avatar>
          <BsvLogo />
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
      <LogoutModal open={modalOpen} onCancel={closeModal} onConfirm={logoutHandler} error={errors} loading={loading} />
    </UserMenuWrapper>
  );
};
