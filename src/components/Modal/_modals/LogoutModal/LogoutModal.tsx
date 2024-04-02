import { FC } from 'react';
import { ConfirmationModalProps, ConfirmationModal } from '../ConfirmationModal';

type LogoutModalProps = Omit<ConfirmationModalProps, 'title' | 'subtitle'>;

export const LogoutModal: FC<LogoutModalProps> = (props) => {
  return <ConfirmationModal {...props} title="Are you sure" subtitle="you want to log out?" />;
};
