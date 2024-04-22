import { useState } from 'react';

export const useContactFields = () => {
  const [paymail, setPaymail] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');

  return {
    paymail,
    setPaymail,
    name,
    setName,
    phone,
    setPhone,
  };
};

export type ContactFields = ReturnType<typeof useContactFields>;
