import { FC, useState } from 'react';
import { SmallButton } from '@/components/Button';
import { ContactEditModal } from './ContactUpsertModal';
import { useContacts } from '@/providers';
import { Contact } from '@/api';
import EditIcon from '@mui/icons-material/Edit';

type ContactEditProps = {
  contact: Contact;
};

export const ContactEdit: FC<ContactEditProps> = ({ contact }) => {
  const [open, setOpen] = useState(false);
  const { refresh } = useContacts();

  const onSubmitted = () => {
    setOpen(false);
    refresh();
  };

  return (
    <>
      <SmallButton variant="accept" small onClick={() => setOpen(true)}>
        <EditIcon fontSize="inherit" />
      </SmallButton>
      {open && <ContactEditModal contact={contact} onSubmitted={onSubmitted} onCancel={() => setOpen(false)} />}
    </>
  );
};
