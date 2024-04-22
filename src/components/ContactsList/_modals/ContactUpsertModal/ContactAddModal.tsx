import { FC } from 'react';
import { ContactUpsertModal } from './ContactUpsertModal';
import { useContactFields } from './useContactFields';

type ContactAddModalProps = {
  onSubmitted: () => void;
  onCancel: () => void;
};

export const ContactAddModal: FC<ContactAddModalProps> = ({ onSubmitted, onCancel }) => {
  const fields = useContactFields();
  return (
    <ContactUpsertModal
      onCancel={onCancel}
      onSubmitted={onSubmitted}
      sucessMsg="Contact added successfully!"
      errorMsg="Error occurred while adding a contact."
      modalTitle="Add contact"
      modalSubtitle="Please double check the paymail address on which the invitation will be sent"
      fields={fields}
      disabledPaymailInput={false}
    />
  );
};
