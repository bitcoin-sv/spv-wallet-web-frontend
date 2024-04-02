import { useContext } from 'react';
import { ContactsContext } from './provider';

export const useContacts = () => useContext(ContactsContext);
