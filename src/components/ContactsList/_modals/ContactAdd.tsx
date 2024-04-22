import { FC, useState } from 'react';
import { Button } from '@/components/Button';
import { ContactAddModal } from './ContactUpsertModal';
import { useContacts } from '@/providers';

export const ContactAdd: FC = () => {
  const [open, setOpen] = useState(false);
  const { refresh } = useContacts();

  const onSubmitted = () => {
    setOpen(false);
    refresh();
  };

  return (
    <>
      <Button variant="primary" small onClick={() => setOpen(true)}>
        Add contact
      </Button>
      {open && <ContactAddModal onSubmitted={onSubmitted} onCancel={() => setOpen(false)} />}
    </>
  );
};
