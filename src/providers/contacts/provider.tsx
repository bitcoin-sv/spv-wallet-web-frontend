import { searchContacts } from '@/api/requests/contact';
import { Contact } from '@/api/types/contact';
import { PaginationParams } from '@/api/types';
import { FC, PropsWithChildren, createContext, useCallback, useEffect, useMemo, useState } from 'react';
import { useAuthorization } from '../authorization';
import { errorMessage } from '@/utils/errorMessage';

type ContactsContextValue = {
  contacts: Contact[] | null;
  refresh: () => void;
  loading: boolean;
  error: string;
};

export const ContactsContext = createContext<ContactsContextValue>(null as never);

export const ContactsProvider: FC<PropsWithChildren> = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [contacts, setContacts] = useState<Contact[] | null>(null);
  const { authorization } = useAuthorization();
  const load = useCallback(async () => {
    if (!authorization) {
      return;
    }
    setLoading(true);
    try {
      const paginationParams: PaginationParams = {
        page: 1,
        page_size: 1000,
        order: 'paymail',
        sort: 'asc',
      };
      const contactsResponse = await searchContacts(paginationParams);
      setContacts(contactsResponse.content);
    } catch (e: unknown) {
      setContacts(null);
      setError(errorMessage(e));
    } finally {
      setLoading(false);
    }
  }, [authorization]);

  const refresh = useCallback(() => {
    load();
  }, [load]);

  useEffect(refresh, [refresh]);

  const context = useMemo(() => {
    return {
      contacts,
      refresh,
      loading,
      error,
    };
  }, [contacts, refresh, loading, error]);

  return <ContactsContext.Provider value={context}>{children}</ContactsContext.Provider>;
};
