import { FC, useEffect } from 'react';
import { ContactUpsertModal } from './ContactUpsertModal';
import { useContactFields } from './useContactFields';
import { Contact } from '@/api';

type ContactEditModalProps = {
  contact: Contact;
  onSubmitted: () => void;
  onCancel: () => void;
};

export const ContactEditModal: FC<ContactEditModalProps> = ({ onSubmitted, onCancel, contact }) => {
  const fields = useContactFields();
  const { setPaymail, setName, setPhone } = fields;

  useEffect(() => {
    setPaymail(contact.paymail);
    setName(contact.fullName);
    setPhone(contact?.metadata?.phoneNumber ?? '');
  }, [contact, setName, setPaymail, setPhone]);

  return (
    <ContactUpsertModal
      onCancel={onCancel}
      onSubmitted={onSubmitted}
      sucessMsg="Contact edited successfully!"
      errorMsg="Error occurred while editing a contact."
      modalTitle="Edit contact"
      modalSubtitle=""
      fields={fields}
      disabledPaymailInput={true}
    />
  );
};
